import { MaterialIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Agency,
  AgencyObjective,
  demoAgency,
  demoAgencyObjectives,
  demoEmployees,
  demoObjectives,
  demoTargets,
  Employee,
  Objective,
  ObjectiveStatus,
  Priority,
  TargetsMap,
} from "@/data/demoData";

type TabType = "info" | "gestion" | "listas";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  const [agency] = useState<Agency>(demoAgency);
  const [employees] = useState<Employee[]>(demoEmployees);
  const [objectives, setObjectives] = useState<Objective[]>(demoObjectives);
  const [targets, setTargets] = useState<TargetsMap>(demoTargets);
  const [agencyObjectives, setAgencyObjectives] = useState<AgencyObjective[]>(
    demoAgencyObjectives,
  );

  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState<{
    employeeId: string;
    objectiveId: string;
  } | null>(null);

  const [detailEmployeeId, setDetailEmployeeId] = useState<string | null>(null);
  const [selectedAgencyObjective, setSelectedAgencyObjective] =
    useState<AgencyObjective | null>(null);

  const [draftTarget, setDraftTarget] = useState("");
  const [draftCurrent, setDraftCurrent] = useState("");

  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const [newAgencyObjectiveId, setNewAgencyObjectiveId] = useState("");
  const [newAgencyObjectiveDescription, setNewAgencyObjectiveDescription] =
    useState("");
  const [newAgencyCurrent, setNewAgencyCurrent] = useState("");
  const [newAgencyTarget, setNewAgencyTarget] = useState("");
  const [newAgencyPriority, setNewAgencyPriority] =
    useState<Priority>("Media");
  const [newAgencyStatus, setNewAgencyStatus] =
    useState<ObjectiveStatus>("Activo");
  const [newAgencyDeadline, setNewAgencyDeadline] = useState("");

  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [fixEmployeeId, setFixEmployeeId] = useState("all");
  const [fixObjectiveId, setFixObjectiveId] = useState("");
  const [fixCurrent, setFixCurrent] = useState("0");
  const [fixTarget, setFixTarget] = useState("");

  const usedObjectives = useMemo(() => {
    return objectives.filter((objective) => {
      const existsInAgency = agencyObjectives.some(
        (agencyObjective) => agencyObjective.objectiveId === objective.id,
      );

      const existsInEmployees = employees.some((employee) =>
        Boolean(targets[employee.id]?.[objective.id]),
      );

      return existsInAgency || existsInEmployees;
    });
  }, [agencyObjectives, employees, objectives, targets]);

  const filteredObjectives = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return usedObjectives;

    return usedObjectives.filter((objective) => {
      return (
        objective.id.toLowerCase().includes(normalizedSearch) ||
        objective.description.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search, usedObjectives]);

  const selectedEmployee = useMemo(() => {
    if (!editing) return null;
    return employees.find((employee) => employee.id === editing.employeeId);
  }, [editing, employees]);

  const selectedObjective = useMemo(() => {
    if (!editing) return null;
    return objectives.find((objective) => objective.id === editing.objectiveId);
  }, [editing, objectives]);

  const detailEmployee = useMemo(() => {
    if (!detailEmployeeId) return null;
    return employees.find((employee) => employee.id === detailEmployeeId) ?? null;
  }, [detailEmployeeId, employees]);

  const detailEmployeeObjectives = useMemo(() => {
    if (!detailEmployee) return [];

    return usedObjectives.filter((objective) => {
      return Boolean(targets[detailEmployee.id]?.[objective.id]);
    });
  }, [detailEmployee, targets, usedObjectives]);

  function openEditModal(employeeId: string, objectiveId: string) {
    const currentTarget = targets[employeeId]?.[objectiveId];

    setEditing({ employeeId, objectiveId });
    setDraftCurrent(String(currentTarget?.current ?? 0));
    setDraftTarget(String(currentTarget?.target ?? 0));
  }

  function closeEditModal() {
    setEditing(null);
    setDraftTarget("");
    setDraftCurrent("");
  }

  function saveTarget() {
    if (!editing) return;

    setSaving(true);

    setTargets((previousTargets) => ({
      ...previousTargets,
      [editing.employeeId]: {
        ...previousTargets[editing.employeeId],
        [editing.objectiveId]: {
          current: Number(draftCurrent || 0),
          target: Number(draftTarget || 0),
        },
      },
    }));

    setSaving(false);
    closeEditModal();
  }

  function confirmDeleteEmployeeTarget(employeeId: string, objectiveId: string) {
    const employee = employees.find((item) => item.id === employeeId);
    const objective = objectives.find((item) => item.id === objectiveId);

    Alert.alert(
      "Borrar objetivo",
      `¿Quieres borrar ${objective?.id ?? objectiveId} de ${
        employee?.name ?? employeeId
      }?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: () => deleteEmployeeTarget(employeeId, objectiveId),
        },
      ],
    );
  }

  function deleteEmployeeTarget(employeeId: string, objectiveId: string) {
    setTargets((previousTargets) => {
      const employeeTargets = { ...(previousTargets[employeeId] ?? {}) };
      delete employeeTargets[objectiveId];

      return {
        ...previousTargets,
        [employeeId]: employeeTargets,
      };
    });
  }

  function openAgencyObjectiveModal() {
    setNewAgencyObjectiveId("");
    setNewAgencyObjectiveDescription("");
    setNewAgencyCurrent("0");
    setNewAgencyTarget("");
    setNewAgencyPriority("Media");
    setNewAgencyStatus("Activo");
    setNewAgencyDeadline("");
    setAgencyModalOpen(true);
  }

  function selectObjectiveForAgency(objective: Objective) {
    setNewAgencyObjectiveId(objective.id);
    setNewAgencyObjectiveDescription(objective.description);
  }

  function createAgencyObjective() {
    const objectiveCode = newAgencyObjectiveId.trim().toUpperCase();
    const objectiveDescription = newAgencyObjectiveDescription.trim();

    if (!objectiveCode) {
      Alert.alert("Falta código", "Escribe un código para el objetivo.");
      return;
    }

    if (!newAgencyTarget.trim()) {
      Alert.alert("Falta objetivo", "Escribe la cantidad objetivo.");
      return;
    }

    if (
      newAgencyDeadline.trim() &&
      !/^\d{2}-\d{2}-\d{4}$/.test(newAgencyDeadline.trim())
    ) {
      Alert.alert(
        "Fecha incorrecta",
        "La fecha límite debe tener formato DD-MM-YYYY. Ejemplo: 30-05-2026",
      );
      return;
    }

    const description =
      objectiveDescription || `Objetivo personalizado ${objectiveCode}`;

    const existsObjective = objectives.some(
      (objective) => objective.id === objectiveCode,
    );

    if (!existsObjective) {
      setObjectives((previous) => [
        ...previous,
        {
          id: objectiveCode,
          title: objectiveCode,
          description,
        },
      ]);
    } else {
      setObjectives((previous) =>
        previous.map((objective) =>
          objective.id === objectiveCode
            ? {
                ...objective,
                description,
              }
            : objective,
        ),
      );
    }

    const newObjective: AgencyObjective = {
      id: Date.now(),
      objectiveId: objectiveCode,
      description,
      current: Number(newAgencyCurrent || 0),
      target: Number(newAgencyTarget || 0),
      priority: newAgencyPriority,
      status: newAgencyStatus,
      createdAt: new Date().toISOString().slice(0, 10),
      deadline: newAgencyDeadline.trim()
        ? convertSpanishDateToIso(newAgencyDeadline.trim())
        : null,
    };

    setAgencyObjectives((previous) => [newObjective, ...previous]);

    setNewAgencyObjectiveId("");
    setNewAgencyObjectiveDescription("");
    setNewAgencyCurrent("0");
    setNewAgencyTarget("");
    setNewAgencyPriority("Media");
    setNewAgencyStatus("Activo");
    setNewAgencyDeadline("");
    setAgencyModalOpen(false);
  }

  function deleteAgencyObjective(id: number) {
    setAgencyObjectives((previous) =>
      previous.filter((objective) => objective.id !== id),
    );

    if (selectedAgencyObjective?.id === id) {
      setSelectedAgencyObjective(null);
    }
  }

  function openFixTargetsModal() {
    setFixEmployeeId("all");
    setFixObjectiveId(usedObjectives[0]?.id ?? objectives[0]?.id ?? "");
    setFixCurrent("0");
    setFixTarget("");
    setFixModalOpen(true);
  }

  function saveFixedTargets() {
    if (!fixObjectiveId) {
      Alert.alert("Falta objetivo", "Selecciona un objetivo.");
      return;
    }

    if (!fixTarget.trim()) {
      Alert.alert("Falta cantidad", "Escribe la cantidad objetivo.");
      return;
    }

    const selectedEmployees =
      fixEmployeeId === "all"
        ? employees
        : employees.filter((employee) => employee.id === fixEmployeeId);

    setTargets((previousTargets) => {
      const updatedTargets = { ...previousTargets };

      selectedEmployees.forEach((employee) => {
        updatedTargets[employee.id] = {
          ...updatedTargets[employee.id],
          [fixObjectiveId]: {
            current: Number(fixCurrent || 0),
            target: Number(fixTarget || 0),
          },
        };
      });

      return updatedTargets;
    });

    setFixModalOpen(false);
  }

  function showAllObjectives() {
    setSearch("");
  }

  function goToModifyObjectives() {
    setActiveTab("gestion");
  }

  async function printDataAnalysis() {
    const html = buildDataAnalysisHtml({
      agency,
      employees,
      objectives: usedObjectives,
      targets,
      agencyObjectives,
    });

    await Print.printAsync({
      html,
    });
  }

  async function printReport() {
    const html = buildReportHtml({
      agency,
      employees,
      objectives: usedObjectives,
      targets,
      agencyObjectives,
    });

    await Print.printAsync({
      html,
    });
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#0875e1" />
        <Text style={styles.loadingText}>Cargando objetivos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6fb" />

      <View style={styles.topBar}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CRM</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContent}
        >
          <Text style={styles.menuItem}>Clientes</Text>
          <Text style={styles.menuItem}>Inmuebles</Text>
          <Text style={styles.menuItem}>Pedidos</Text>
          <Text style={styles.menuItem}>Relaciones Cruce</Text>
          <Text style={styles.menuItem}>Act/Citas</Text>
          <Text style={styles.menuItem}>Blog/Informes</Text>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Objetivos</Text>
            <Text style={styles.subtitle}>Panel mobile del CRM</Text>
          </View>

          <View style={styles.rolePill}>
            <Text style={styles.rolePillText}>Titular (admin)</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar objetivo..."
            placeholderTextColor="#8b98b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.tabs}>
          <TabButton
            label="Información"
            active={activeTab === "info"}
            onPress={() => setActiveTab("info")}
          />
          <TabButton
            label="Gestión de Objetivos"
            active={activeTab === "gestion"}
            onPress={() => setActiveTab("gestion")}
          />
          <TabButton
            label="Listas relacionadas"
            active={activeTab === "listas"}
            onPress={() => setActiveTab("listas")}
          />
        </View>

        {activeTab === "info" && (
          <InfoTab
            agency={agency}
            employees={employees}
            onModifyObjectives={goToModifyObjectives}
            onPrintAnalysis={printDataAnalysis}
            onPrintReport={printReport}
          />
        )}

        {activeTab === "gestion" && (
          <GestionTab
            employees={employees}
            objectives={filteredObjectives}
            allObjectives={usedObjectives}
            targets={targets}
            agencyObjectives={agencyObjectives}
            onEditTarget={openEditModal}
            onOpenAgencyModal={openAgencyObjectiveModal}
            onOpenAgencyObjectiveDetail={setSelectedAgencyObjective}
            onDeleteAgencyObjective={deleteAgencyObjective}
            onDeleteEmployeeTarget={confirmDeleteEmployeeTarget}
            onViewEmployeeDetail={setDetailEmployeeId}
            onReload={showAllObjectives}
            onShowAll={showAllObjectives}
            onOpenFixTargets={openFixTargetsModal}
          />
        )}

        {activeTab === "listas" && (
          <RelatedListsTab
            employees={employees}
            objectives={usedObjectives}
            agencyObjectives={agencyObjectives}
          />
        )}
      </ScrollView>

      <Modal
        visible={editing !== null}
        animationType="fade"
        transparent
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar objetivo</Text>

            <Text style={styles.modalDescription}>
              {selectedEmployee?.name} · {selectedObjective?.title}
            </Text>

            <Text style={styles.modalLabel}>Valor actual</Text>
            <TextInput
              style={styles.modalInput}
              value={draftCurrent}
              onChangeText={(value) =>
                setDraftCurrent(value.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Ej: 0"
              placeholderTextColor="#8b98b8"
            />

            <Text style={styles.modalLabel}>Objetivo</Text>
            <TextInput
              style={styles.modalInput}
              value={draftTarget}
              onChangeText={(value) =>
                setDraftTarget(value.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Ej: 5"
              placeholderTextColor="#8b98b8"
            />

            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={closeEditModal}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={saveTarget}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Guardando..." : "Guardar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={agencyModalOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setAgencyModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Nuevo objetivo de agencia</Text>
              <Text style={styles.modalDescription}>
                Puedes elegir uno existente o escribir un objetivo nuevo.
              </Text>

              <Text style={styles.modalLabel}>Objetivos existentes</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.objectiveSelector}
              >
                {objectives.map((objective) => (
                  <TouchableOpacity
                    key={objective.id}
                    style={[
                      styles.objectiveSelectorButton,
                      newAgencyObjectiveId.toUpperCase() === objective.id &&
                        styles.objectiveSelectorButtonActive,
                    ]}
                    onPress={() => selectObjectiveForAgency(objective)}
                  >
                    <Text
                      style={[
                        styles.objectiveSelectorText,
                        newAgencyObjectiveId.toUpperCase() === objective.id &&
                          styles.objectiveSelectorTextActive,
                      ]}
                    >
                      {objective.id}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.modalLabel}>Código del objetivo</Text>
              <TextInput
                style={styles.modalInput}
                value={newAgencyObjectiveId}
                onChangeText={setNewAgencyObjectiveId}
                placeholder="Ej: OBJ10"
                autoCapitalize="characters"
                placeholderTextColor="#8b98b8"
              />

              <Text style={styles.modalLabel}>Descripción</Text>
              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                value={newAgencyObjectiveDescription}
                onChangeText={setNewAgencyObjectiveDescription}
                placeholder="Ej: Nuevas visitas comerciales"
                placeholderTextColor="#8b98b8"
                multiline
              />

              <Text style={styles.modalLabel}>Prioridad</Text>
              <OptionSelector
                options={["Alta", "Media", "Baja"]}
                selected={newAgencyPriority}
                onSelect={(value) => setNewAgencyPriority(value as Priority)}
              />

              <Text style={styles.modalLabel}>Estado</Text>
              <OptionSelector
                options={["Pendiente", "Activo", "Completado", "Pausado"]}
                selected={newAgencyStatus}
                onSelect={(value) =>
                  setNewAgencyStatus(value as ObjectiveStatus)
                }
              />

              <Text style={styles.modalLabel}>Actual</Text>
              <TextInput
                style={styles.modalInput}
                value={newAgencyCurrent}
                onChangeText={(value) =>
                  setNewAgencyCurrent(value.replace(/[^0-9]/g, ""))
                }
                keyboardType="numeric"
                placeholder="Ej: 0"
                placeholderTextColor="#8b98b8"
              />

              <Text style={styles.modalLabel}>Objetivo total</Text>
              <TextInput
                style={styles.modalInput}
                value={newAgencyTarget}
                onChangeText={(value) =>
                  setNewAgencyTarget(value.replace(/[^0-9]/g, ""))
                }
                keyboardType="numeric"
                placeholder="Ej: 10"
                placeholderTextColor="#8b98b8"
              />

              <Text style={styles.modalLabel}>Fecha límite</Text>
              <TextInput
                style={styles.modalInput}
                value={newAgencyDeadline}
                onChangeText={setNewAgencyDeadline}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#8b98b8"
              />

              <View style={styles.modalActions}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setAgencyModalOpen(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={styles.saveButton}
                  onPress={createAgencyObjective}
                  disabled={saving}
                >
                  <Text style={styles.saveButtonText}>
                    {saving ? "Creando..." : "Crear"}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={fixModalOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setFixModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Fijar objetivos</Text>
            <Text style={styles.modalDescription}>
              Actualiza un objetivo para todo el equipo o para un empleado.
            </Text>

            <Text style={styles.modalLabel}>Empleado</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.objectiveSelector}
            >
              <TouchableOpacity
                style={[
                  styles.objectiveSelectorButton,
                  fixEmployeeId === "all" &&
                    styles.objectiveSelectorButtonActive,
                ]}
                onPress={() => setFixEmployeeId("all")}
              >
                <Text
                  style={[
                    styles.objectiveSelectorText,
                    fixEmployeeId === "all" &&
                      styles.objectiveSelectorTextActive,
                  ]}
                >
                  Todos
                </Text>
              </TouchableOpacity>

              {employees.map((employee) => (
                <TouchableOpacity
                  key={employee.id}
                  style={[
                    styles.objectiveSelectorButton,
                    fixEmployeeId === employee.id &&
                      styles.objectiveSelectorButtonActive,
                  ]}
                  onPress={() => setFixEmployeeId(employee.id)}
                >
                  <Text
                    style={[
                      styles.objectiveSelectorText,
                      fixEmployeeId === employee.id &&
                        styles.objectiveSelectorTextActive,
                    ]}
                  >
                    {employee.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.modalLabel}>Objetivo</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.objectiveSelector}
            >
              {objectives.map((objective) => (
                <TouchableOpacity
                  key={objective.id}
                  style={[
                    styles.objectiveSelectorButton,
                    fixObjectiveId === objective.id &&
                      styles.objectiveSelectorButtonActive,
                  ]}
                  onPress={() => setFixObjectiveId(objective.id)}
                >
                  <Text
                    style={[
                      styles.objectiveSelectorText,
                      fixObjectiveId === objective.id &&
                        styles.objectiveSelectorTextActive,
                    ]}
                  >
                    {objective.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.modalLabel}>Actual</Text>
            <TextInput
              style={styles.modalInput}
              value={fixCurrent}
              onChangeText={(value) =>
                setFixCurrent(value.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Ej: 0"
              placeholderTextColor="#8b98b8"
            />

            <Text style={styles.modalLabel}>Objetivo</Text>
            <TextInput
              style={styles.modalInput}
              value={fixTarget}
              onChangeText={(value) =>
                setFixTarget(value.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Ej: 5"
              placeholderTextColor="#8b98b8"
            />

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setFixModalOpen(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={saveFixedTargets}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Guardando..." : "Guardar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={detailEmployeeId !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setDetailEmployeeId(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.detailModalHeader}>
              <View>
                <Text style={styles.modalTitle}>Detalle de empleado</Text>
                <Text style={styles.modalDescription}>
                  {detailEmployee?.name} · {detailEmployee?.role}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDetailEmployeeId(null)}
              >
                <MaterialIcons name="close" size={20} color="#526380" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.detailModalContent}
            >
              {detailEmployee && detailEmployeeObjectives.length === 0 ? (
                <View style={styles.emptyAgencyBox}>
                  <MaterialIcons name="inbox" size={30} color="#ccd6e4" />
                  <Text style={styles.emptyText}>
                    Este empleado no tiene objetivos asignados
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Puedes añadirlos desde Fijar objetivos.
                  </Text>
                </View>
              ) : null}

              {detailEmployee &&
                detailEmployeeObjectives.map((objective) => {
                  const value = targets[detailEmployee.id]?.[objective.id] ?? {
                    current: 0,
                    target: 0,
                  };

                  const progress = getProgressPercent(
                    value.current,
                    value.target,
                  );

                  return (
                    <View key={objective.id} style={styles.detailObjectiveCard}>
                      <View style={styles.detailObjectiveHeader}>
                        <View style={styles.objectiveInfo}>
                          <Text style={styles.objectiveCode}>
                            {objective.id}
                          </Text>
                          <Text style={styles.objectiveDescription}>
                            {objective.description}
                          </Text>
                        </View>

                        <View style={styles.objectiveNumbers}>
                          <Text style={styles.currentNumber}>
                            {value.current}
                          </Text>
                          <Text style={styles.separator}>/</Text>
                          <Text style={styles.targetNumber}>
                            {value.target}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.progressTrack}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progress}%` },
                          ]}
                        />
                      </View>

                      <Text style={styles.detailProgressText}>
                        Progreso: {progress}%
                      </Text>

                      <View style={styles.rowActions}>
                        <TouchableOpacity
                          style={styles.rowActionButton}
                          onPress={() => {
                            setDetailEmployeeId(null);
                            openEditModal(detailEmployee.id, objective.id);
                          }}
                        >
                          <MaterialIcons
                            name="edit"
                            size={16}
                            color="#0875e1"
                          />
                          <Text style={styles.rowActionText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.rowActionButton,
                            styles.rowDeleteButton,
                          ]}
                          onPress={() =>
                            confirmDeleteEmployeeTarget(
                              detailEmployee.id,
                              objective.id,
                            )
                          }
                        >
                          <MaterialIcons
                            name="delete"
                            size={16}
                            color="#ff2d2d"
                          />
                          <Text style={styles.rowDeleteText}>Borrar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={selectedAgencyObjective !== null}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedAgencyObjective(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.detailModalHeader}>
              <View>
                <Text style={styles.modalTitle}>Objetivo de agencia</Text>
                <Text style={styles.modalDescription}>
                  {selectedAgencyObjective?.objectiveId}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedAgencyObjective(null)}
              >
                <MaterialIcons name="close" size={20} color="#526380" />
              </TouchableOpacity>
            </View>

            {selectedAgencyObjective ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.detailModalContent}
              >
                <View style={styles.detailObjectiveCard}>
                  <Text style={styles.detailLabel}>Descripción</Text>
                  <Text style={styles.detailValue}>
                    {selectedAgencyObjective.description}
                  </Text>

                  <View style={styles.detailGrid}>
                    <InfoBox
                      label="Prioridad"
                      value={selectedAgencyObjective.priority}
                      iconName="priority-high"
                    />

                    <InfoBox
                      label="Estado"
                      value={selectedAgencyObjective.status}
                      iconName={getAgencyStatusIcon(
                        selectedAgencyObjective.status,
                      )}
                    />

                    <InfoBox
                      label="Creación"
                      value={formatDate(selectedAgencyObjective.createdAt)}
                      iconName="event"
                    />

                    <InfoBox
                      label="Fecha límite"
                      value={formatDate(selectedAgencyObjective.deadline)}
                      iconName="event-available"
                    />
                  </View>

                  <View style={styles.detailNumbersBox}>
                    <Text style={styles.detailLabel}>Progreso</Text>

                    <View style={styles.objectiveNumbers}>
                      <Text style={styles.currentNumber}>
                        {selectedAgencyObjective.current}
                      </Text>
                      <Text style={styles.separator}>/</Text>
                      <Text style={styles.targetNumber}>
                        {selectedAgencyObjective.target}
                      </Text>
                    </View>

                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${getProgressPercent(
                              selectedAgencyObjective.current,
                              selectedAgencyObjective.target,
                            )}%`,
                          },
                        ]}
                      />
                    </View>

                    <Text style={styles.detailProgressText}>
                      Progreso:{" "}
                      {getProgressPercent(
                        selectedAgencyObjective.current,
                        selectedAgencyObjective.target,
                      )}
                      %
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.rowActionButton, styles.rowDeleteButton]}
                    onPress={() => deleteAgencyObjective(selectedAgencyObjective.id)}
                  >
                    <MaterialIcons name="delete" size={16} color="#ff2d2d" />
                    <Text style={styles.rowDeleteText}>Eliminar objetivo</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, active && styles.tabButtonActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function OptionSelector({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.objectiveSelector}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.objectiveSelectorButton,
            selected === option && styles.objectiveSelectorButtonActive,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.objectiveSelectorText,
              selected === option && styles.objectiveSelectorTextActive,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function InfoTab({
  agency,
  employees,
  onModifyObjectives,
  onPrintAnalysis,
  onPrintReport,
}: {
  agency: Agency;
  employees: Employee[];
  onModifyObjectives: () => void;
  onPrintAnalysis: () => void;
  onPrintReport: () => void;
}) {
  return (
    <View style={styles.screenBlock}>
      <View style={styles.actionsRow}>
        <ActionButton
          iconName="edit-note"
          label="Modifica objetivos"
          onPress={onModifyObjectives}
        />

        <ActionButton
          iconName="analytics"
          label="Imprime análisis de datos"
          onPress={onPrintAnalysis}
        />

        <ActionButton
          iconName="print"
          label="Report"
          primary
          onPress={onPrintReport}
        />
      </View>

      <SectionTitle iconName="business" label="TU AGENCIA" />

      <View style={styles.agencyCard}>
        <View style={styles.agencyIcon}>
          <MaterialIcons name="apartment" size={22} color="#0875e1" />
        </View>

        <View>
          <Text style={styles.cardTitle}>{agency.name}</Text>
          <Text style={styles.cardSubtitle}>{agency.office}</Text>
        </View>
      </View>

      <SectionTitle iconName="groups" label="TU EQUIPO" />

      <View style={styles.teamList}>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </View>
    </View>
  );
}

function GestionTab({
  employees,
  objectives,
  allObjectives,
  targets,
  agencyObjectives,
  onEditTarget,
  onOpenAgencyModal,
  onOpenAgencyObjectiveDetail,
  onDeleteAgencyObjective,
  onDeleteEmployeeTarget,
  onViewEmployeeDetail,
  onReload,
  onShowAll,
  onOpenFixTargets,
}: {
  employees: Employee[];
  objectives: Objective[];
  allObjectives: Objective[];
  targets: TargetsMap;
  agencyObjectives: AgencyObjective[];
  onEditTarget: (employeeId: string, objectiveId: string) => void;
  onOpenAgencyModal: () => void;
  onOpenAgencyObjectiveDetail: (objective: AgencyObjective) => void;
  onDeleteAgencyObjective: (id: number) => void;
  onDeleteEmployeeTarget: (employeeId: string, objectiveId: string) => void;
  onViewEmployeeDetail: (employeeId: string) => void;
  onReload: () => void;
  onShowAll: () => void;
  onOpenFixTargets: () => void;
}) {
  return (
    <View style={styles.screenBlock}>
      <View style={styles.gestionHeader}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={onShowAll}>
            <Text style={styles.backText}>← ver todo</Text>
          </TouchableOpacity>

          <Text style={styles.detailTitle}>
            Ventas totales de agencias en el mes
          </Text>

          <Text style={styles.smallNumber}>{agencyObjectives.length}</Text>
        </View>

        <TouchableOpacity
          style={styles.smallPrimaryButton}
          onPress={onOpenFixTargets}
        >
          <MaterialIcons name="track-changes" size={15} color="#ffffff" />
          <Text style={styles.smallPrimaryButtonText}>Fijar objetivos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsRow}
      >
        {allObjectives.length === 0 ? (
          <View style={styles.emptyAgencyBox}>
            <MaterialIcons name="inbox" size={30} color="#ccd6e4" />
            <Text style={styles.emptyText}>No hay objetivos activos</Text>
            <Text style={styles.emptySubtext}>
              Crea un objetivo de agencia o fíjalo a empleados.
            </Text>
          </View>
        ) : null}

        {allObjectives.map((objective) => (
          <MetricCard
            key={objective.id}
            code={objective.id}
            description={objective.description}
            current={getTotalCurrent(employees, targets, objective.id)}
            target={getTotalTarget(employees, targets, objective.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <SectionTitle iconName="business" label="Objetivos de Agencia" noMargin />
        <TouchableOpacity
          style={styles.smallPrimaryButton}
          onPress={onOpenAgencyModal}
        >
          <MaterialIcons name="add" size={15} color="#ffffff" />
          <Text style={styles.smallPrimaryButtonText}>Nuevo objetivo</Text>
        </TouchableOpacity>
      </View>

      {agencyObjectives.length === 0 ? (
        <View style={styles.emptyAgencyBox}>
          <MaterialIcons name="inbox" size={30} color="#ccd6e4" />
          <Text style={styles.emptyText}>No hay objetivos de agencia</Text>
          <Text style={styles.emptySubtext}>
            Crea el primer objetivo desde aquí
          </Text>
        </View>
      ) : (
        <View style={styles.agencyObjectivesList}>
          {agencyObjectives.map((objective) => (
            <AgencyObjectiveCard
              key={objective.id}
              objective={objective}
              onOpenDetail={onOpenAgencyObjectiveDetail}
              onDelete={onDeleteAgencyObjective}
            />
          ))}
        </View>
      )}

      <View style={styles.sectionHeaderRow}>
        <SectionTitle iconName="groups" label="Objetivos de Empleados" noMargin />
        <TouchableOpacity style={styles.smallPrimaryButton} onPress={onReload}>
          <MaterialIcons name="refresh" size={15} color="#ffffff" />
          <Text style={styles.smallPrimaryButtonText}>Recargar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.employeeObjectivesList}>
        {employees.map((employee) => (
          <EmployeeObjectivesCard
            key={employee.id}
            employee={employee}
            objectives={objectives}
            targets={targets}
            onEditTarget={onEditTarget}
            onDeleteEmployeeTarget={onDeleteEmployeeTarget}
            onViewEmployeeDetail={onViewEmployeeDetail}
          />
        ))}
      </View>
    </View>
  );
}

function AgencyObjectiveCard({
  objective,
  onOpenDetail,
  onDelete,
}: {
  objective: AgencyObjective;
  onOpenDetail: (objective: AgencyObjective) => void;
  onDelete: (id: number) => void;
}) {
  const progress = getProgressPercent(objective.current, objective.target);

  return (
    <View style={styles.agencyObjectiveCard}>
      <View style={styles.agencyObjectiveTop}>
        <View style={styles.objectiveInfo}>
          <Text style={styles.objectiveCode}>{objective.objectiveId}</Text>
          <Text style={styles.objectiveDescription}>
            {objective.description}
          </Text>
        </View>

        <View style={styles.objectiveNumbers}>
          <Text style={styles.currentNumber}>{objective.current}</Text>
          <Text style={styles.separator}>/</Text>
          <Text style={styles.targetNumber}>{objective.target}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <MetaPill
          iconName="priority-high"
          label="Prioridad"
          value={objective.priority}
        />
        <MetaPill
          iconName={getAgencyStatusIcon(objective.status)}
          label="Estado"
          value={objective.status}
        />
      </View>

      <View style={styles.metaRow}>
        <MetaPill
          iconName="event"
          label="Creación"
          value={formatDate(objective.createdAt)}
        />
        <MetaPill
          iconName="event-available"
          label="Límite"
          value={formatDate(objective.deadline)}
        />
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.detailProgressText}>Progreso: {progress}%</Text>

      <View style={styles.rowActions}>
        <TouchableOpacity
          style={styles.rowActionButton}
          onPress={() => onOpenDetail(objective)}
        >
          <MaterialIcons name="visibility" size={16} color="#0875e1" />
          <Text style={styles.rowActionText}>Ver detalle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rowActionButton, styles.rowDeleteButton]}
          onPress={() => onDelete(objective.id)}
        >
          <MaterialIcons name="delete" size={16} color="#ff2d2d" />
          <Text style={styles.rowDeleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MetaPill({
  iconName,
  label,
  value,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metaPill}>
      <MaterialIcons name={iconName} size={14} color="#47678f" />
      <Text style={styles.metaPillText}>
        {label}: <Text style={styles.metaPillValue}>{value}</Text>
      </Text>
    </View>
  );
}

function InfoBox({
  iconName,
  label,
  value,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoBox}>
      <MaterialIcons name={iconName} size={20} color="#0875e1" />
      <Text style={styles.infoBoxLabel}>{label}</Text>
      <Text style={styles.infoBoxValue}>{value}</Text>
    </View>
  );
}

function RelatedListsTab({
  employees,
  objectives,
  agencyObjectives,
}: {
  employees: Employee[];
  objectives: Objective[];
  agencyObjectives: AgencyObjective[];
}) {
  return (
    <View style={styles.screenBlock}>
      <SectionTitle iconName="list-alt" label="LISTAS RELACIONADAS" />

      <RelatedCard
        title="Historial de objetivos"
        description="Consulta cambios anteriores de objetivos mensuales."
        count="Demo"
      />

      <RelatedCard
        title="Objetivos por empleado"
        description="Resumen individual de objetivos y resultados."
        count={`${employees.length} empleados`}
      />

      <RelatedCard
        title="Objetivos disponibles"
        description="Catálogo de objetivos cargados desde archivo local."
        count={`${objectives.length} objetivos`}
      />

      <RelatedCard
        title="Objetivos de agencia"
        description="Listado de objetivos generales de la oficina."
        count={`${agencyObjectives.length} activos`}
      />
    </View>
  );
}

function ActionButton({
  iconName,
  label,
  primary,
  onPress,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  primary?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.actionButton, primary && styles.actionButtonPrimary]}
      onPress={onPress}
    >
      <MaterialIcons
        name={iconName}
        size={18}
        color={primary ? "#ffffff" : "#101827"}
      />

      <Text style={[styles.actionText, primary && styles.actionTextPrimary]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function SectionTitle({
  iconName,
  label,
  noMargin,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  noMargin?: boolean;
}) {
  return (
    <View style={[styles.sectionTitle, noMargin && styles.noMargin]}>
      <MaterialIcons name={iconName} size={16} color="#47678f" />
      <Text style={styles.sectionText}>{label}</Text>
    </View>
  );
}

function EmployeeCard({ employee }: { employee: Employee }) {
  const status = getStatusData(employee.status);

  return (
    <View style={styles.employeeCard}>
      <View>
        <Text style={styles.employeeName}>{employee.name}</Text>

        <View style={styles.statusRow}>
          <MaterialIcons
            name={status.iconName}
            size={20}
            color={status.color}
          />
        </View>
      </View>

      <Text style={styles.employeeRole}>{employee.role}</Text>
    </View>
  );
}

function MetricCard({
  code,
  description,
  current,
  target,
}: {
  code: string;
  description: string;
  current: number;
  target: number;
}) {
  const progress = target === 0 ? 0 : current / target;

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricCircle}>
        <Text style={styles.metricValue}>
          {current}/{target}
        </Text>
      </View>

      <Text style={styles.metricCode}>{code}</Text>
      <Text style={styles.metricDescription} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(progress * 100, 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

function EmployeeObjectivesCard({
  employee,
  objectives,
  targets,
  onEditTarget,
  onDeleteEmployeeTarget,
  onViewEmployeeDetail,
}: {
  employee: Employee;
  objectives: Objective[];
  targets: TargetsMap;
  onEditTarget: (employeeId: string, objectiveId: string) => void;
  onDeleteEmployeeTarget: (employeeId: string, objectiveId: string) => void;
  onViewEmployeeDetail: (employeeId: string) => void;
}) {
  const assignedObjectives = objectives.filter((objective) => {
    return Boolean(targets[employee.id]?.[objective.id]);
  });

  const completed = assignedObjectives.filter((objective) => {
    const value = targets[employee.id]?.[objective.id];
    if (!value) return false;
    return value.target > 0 && value.current >= value.target;
  }).length;

  return (
    <View style={styles.objectiveEmployeeCard}>
      <View style={styles.objectiveEmployeeHeader}>
        <View>
          <Text style={styles.employeeName}>{employee.name}</Text>
          <Text style={styles.employeeRole}>{employee.role}</Text>
        </View>

        <View style={styles.employeeBadge}>
          <Text style={styles.employeeBadgeText}>
            {completed} objetivos cumplidos
          </Text>
        </View>
      </View>

      <View style={styles.objectiveRows}>
        {assignedObjectives.length === 0 ? (
          <View style={styles.emptyEmployeeObjectiveBox}>
            <Text style={styles.emptyText}>Sin objetivos asignados</Text>
            <Text style={styles.emptySubtext}>
              Usa Fijar objetivos para añadir uno.
            </Text>
          </View>
        ) : null}

        {assignedObjectives.map((objective) => {
          const value = targets[employee.id]?.[objective.id] ?? {
            current: 0,
            target: 0,
          };

          return (
            <View key={objective.id} style={styles.objectiveRow}>
              <View style={styles.objectiveInfo}>
                <Text style={styles.objectiveCode}>{objective.id}</Text>
                <Text style={styles.objectiveDescription} numberOfLines={1}>
                  {objective.description}
                </Text>
              </View>

              <View style={styles.objectiveNumbers}>
                <Text style={styles.currentNumber}>{value.current}</Text>
                <Text style={styles.separator}>/</Text>
                <Text style={styles.targetNumber}>{value.target}</Text>
              </View>

              <View style={styles.objectiveRowActions}>
                <TouchableOpacity
                  style={styles.iconActionButton}
                  onPress={() => onEditTarget(employee.id, objective.id)}
                >
                  <MaterialIcons name="edit" size={16} color="#0875e1" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconActionButton}
                  onPress={() =>
                    onDeleteEmployeeTarget(employee.id, objective.id)
                  }
                >
                  <MaterialIcons name="delete" size={16} color="#ff2d2d" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => onViewEmployeeDetail(employee.id)}
      >
        <MaterialIcons name="link" size={14} color="#0875e1" />
        <Text style={styles.detailButtonText}>ver detalle</Text>
      </TouchableOpacity>
    </View>
  );
}

function RelatedCard({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: string;
}) {
  return (
    <TouchableOpacity style={styles.relatedCard} activeOpacity={0.8}>
      <View>
        <Text style={styles.relatedTitle}>{title}</Text>
        <Text style={styles.relatedDescription}>{description}</Text>
      </View>

      <Text style={styles.relatedCount}>{count}</Text>
    </TouchableOpacity>
  );
}

function getTotalTarget(
  employees: Employee[],
  targets: TargetsMap,
  objectiveId: string,
) {
  return employees.reduce((total, employee) => {
    return total + (targets[employee.id]?.[objectiveId]?.target ?? 0);
  }, 0);
}

function getTotalCurrent(
  employees: Employee[],
  targets: TargetsMap,
  objectiveId: string,
) {
  return employees.reduce((total, employee) => {
    return total + (targets[employee.id]?.[objectiveId]?.current ?? 0);
  }, 0);
}

function getStatusData(status: Employee["status"]): {
  iconName: keyof typeof MaterialIcons.glyphMap;
  color: string;
} {
  if (status === "ok") {
    return {
      iconName: "check-circle",
      color: "#00b894",
    };
  }

  if (status === "danger") {
    return {
      iconName: "error-outline",
      color: "#ff2d2d",
    };
  }

  return {
    iconName: "warning",
    color: "#ff9800",
  };
}

function getAgencyStatusIcon(
  status: string,
): keyof typeof MaterialIcons.glyphMap {
  if (status === "Completado") return "check-circle";
  if (status === "Pausado") return "pause-circle";
  if (status === "Pendiente") return "schedule";
  return "radio-button-checked";
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Sin fecha";

  const datePart = String(value).slice(0, 10);
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return "Sin fecha";
  }

  return `${day}/${month}/${year}`;
}

function convertSpanishDateToIso(value: string) {
  const [day, month, year] = value.split("-");
  return `${year}-${month}-${day}`;
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getProgressPercent(current: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

function buildBaseHtml({ title, body }: { title: string; body: string }) {
  const today = new Date().toLocaleDateString("es-ES");

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f4f6fb;
            color: #111827;
            margin: 0;
            padding: 28px;
          }

          .page {
            background: #ffffff;
            border-radius: 18px;
            padding: 28px;
            border: 1px solid #dde4f0;
          }

          .top {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #0875e1;
            padding-bottom: 18px;
            margin-bottom: 22px;
          }

          .logo {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: #0875e1;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
          }

          h1 {
            font-size: 28px;
            margin: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }

          th {
            background: #edf2fa;
            color: #44556f;
            font-size: 12px;
            text-align: left;
            padding: 10px;
            border: 1px solid #dde4f0;
          }

          td {
            font-size: 12px;
            padding: 10px;
            border: 1px solid #dde4f0;
          }

          .red {
            color: #ff2d2d;
            font-weight: 900;
          }

          .blue {
            color: #0875e1;
            font-weight: 900;
          }
        </style>
      </head>

      <body>
        <div class="page">
          <div class="top">
            <div>
              <h1>${escapeHtml(title)}</h1>
              <p>Panel de objetivos mobile</p>
            </div>
            <div class="logo">CRM</div>
          </div>

          ${body}
        </div>
      </body>
    </html>
  `;
}

function buildDataAnalysisHtml({
  agency,
  employees,
  objectives,
  targets,
  agencyObjectives,
}: {
  agency: Agency;
  employees: Employee[];
  objectives: Objective[];
  targets: TargetsMap;
  agencyObjectives: AgencyObjective[];
}) {
  const objectiveRows = objectives
    .map((objective) => {
      const current = getTotalCurrent(employees, targets, objective.id);
      const target = getTotalTarget(employees, targets, objective.id);
      const percent = getProgressPercent(current, target);

      return `
        <tr>
          <td><strong>${escapeHtml(objective.id)}</strong></td>
          <td>${escapeHtml(objective.description)}</td>
          <td><span class="red">${escapeHtml(current)}</span></td>
          <td>${escapeHtml(target)}</td>
          <td><span class="blue">${escapeHtml(percent)}%</span></td>
        </tr>
      `;
    })
    .join("");

  const agencyRows = agencyObjectives
    .map((objective) => {
      return `
        <tr>
          <td><strong>${escapeHtml(objective.objectiveId)}</strong></td>
          <td>${escapeHtml(objective.description)}</td>
          <td>${escapeHtml(objective.priority)}</td>
          <td>${escapeHtml(objective.status)}</td>
          <td>${escapeHtml(formatDate(objective.createdAt))}</td>
          <td>${escapeHtml(formatDate(objective.deadline))}</td>
        </tr>
      `;
    })
    .join("");

  const body = `
    <h2>${escapeHtml(agency.name)}</h2>
    <p>${escapeHtml(agency.office)}</p>

    <h2>Análisis por objetivo</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descripción</th>
          <th>Actual</th>
          <th>Objetivo</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        ${objectiveRows}
      </tbody>
    </table>

    <h2>Objetivos de agencia</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descripción</th>
          <th>Prioridad</th>
          <th>Estado</th>
          <th>Creación</th>
          <th>Fecha límite</th>
        </tr>
      </thead>
      <tbody>
        ${agencyRows}
      </tbody>
    </table>
  `;

  return buildBaseHtml({
    title: "Análisis de datos",
    body,
  });
}

function buildReportHtml({
  agency,
  employees,
  objectives,
  targets,
  agencyObjectives,
}: {
  agency: Agency;
  employees: Employee[];
  objectives: Objective[];
  targets: TargetsMap;
  agencyObjectives: AgencyObjective[];
}) {
  return buildDataAnalysisHtml({
    agency,
    employees,
    objectives,
    targets,
    agencyObjectives,
  });
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#526380",
    fontWeight: "700",
  },

  topBar: {
    height: 56,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dde4f0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  logo: {
    width: 38,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#0875e1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  logoText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 12,
  },

  menuContent: {
    alignItems: "center",
    gap: 18,
    paddingRight: 20,
  },

  menuItem: {
    fontSize: 13,
    color: "#33476b",
    fontWeight: "500",
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 16,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#080808",
    letterSpacing: -1,
  },

  subtitle: {
    marginTop: 4,
    color: "#8b98b8",
    fontSize: 13,
  },

  rolePill: {
    backgroundColor: "#dcebff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  rolePillText: {
    color: "#006fe6",
    fontSize: 12,
    fontWeight: "700",
  },

  searchBox: {
    height: 46,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dde4f0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  searchIcon: {
    fontSize: 20,
    color: "#8b98b8",
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1b2d4a",
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#edf2fa",
    borderRadius: 16,
    padding: 4,
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
  },

  tabButtonActive: {
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  tabText: {
    fontSize: 12,
    color: "#526380",
    fontWeight: "600",
    textAlign: "center",
  },

  tabTextActive: {
    color: "#0072e5",
    fontWeight: "800",
  },

  screenBlock: {
    gap: 16,
  },

  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  actionButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dde4f0",
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  actionButtonPrimary: {
    backgroundColor: "#0875e1",
    borderColor: "#0875e1",
  },

  actionText: {
    color: "#101827",
    fontSize: 12,
    fontWeight: "700",
  },

  actionTextPrimary: {
    color: "#ffffff",
  },

  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 4,
  },

  noMargin: {
    marginTop: 0,
  },

  sectionText: {
    color: "#44556f",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  agencyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    padding: 18,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  agencyIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#e8f2ff",
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "800",
  },

  cardSubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: "#8b98b8",
    fontWeight: "600",
  },

  teamList: {
    gap: 12,
  },

  employeeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    padding: 18,
    minHeight: 130,
    justifyContent: "space-between",
  },

  employeeName: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  employeeRole: {
    color: "#8b98b8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
    marginTop: 4,
  },

  statusRow: {
    marginTop: 8,
  },

  gestionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    flex: 1,
  },

  backText: {
    color: "#0875e1",
    fontSize: 12,
    fontWeight: "800",
  },

  detailTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  smallNumber: {
    color: "#526380",
    fontSize: 12,
    fontWeight: "700",
  },

  metricsRow: {
    gap: 12,
    paddingRight: 16,
  },

  metricCard: {
    width: 170,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    padding: 14,
  },

  metricCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 7,
    borderColor: "#e5ebf4",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  metricValue: {
    color: "#526380",
    fontSize: 11,
    fontWeight: "800",
  },

  metricCode: {
    textAlign: "center",
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
  },

  metricDescription: {
    textAlign: "center",
    color: "#8b98b8",
    fontSize: 10,
    marginTop: 4,
    minHeight: 28,
  },

  progressTrack: {
    height: 5,
    backgroundColor: "#eef3f9",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#0875e1",
    borderRadius: 999,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  smallPrimaryButton: {
    backgroundColor: "#0875e1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  smallPrimaryButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  emptyAgencyBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 8,
  },

  emptyEmployeeObjectiveBox: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#8b98b8",
    fontWeight: "800",
    fontSize: 13,
  },

  emptySubtext: {
    color: "#a7b1c7",
    fontSize: 11,
    marginTop: 4,
  },

  agencyObjectivesList: {
    gap: 10,
  },

  agencyObjectiveCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    padding: 14,
    gap: 10,
  },

  agencyObjectiveTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  metaPill: {
    backgroundColor: "#f0f6ff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaPillText: {
    color: "#526380",
    fontSize: 11,
    fontWeight: "700",
  },

  metaPillValue: {
    color: "#111827",
    fontWeight: "900",
  },

  employeeObjectivesList: {
    gap: 14,
  },

  objectiveEmployeeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    overflow: "hidden",
  },

  objectiveEmployeeHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#edf1f7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  employeeBadge: {
    backgroundColor: "#f0f6ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  employeeBadgeText: {
    color: "#0875e1",
    fontSize: 10,
    fontWeight: "800",
  },

  objectiveRows: {
    paddingHorizontal: 14,
  },

  objectiveRow: {
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: "#edf1f7",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  objectiveInfo: {
    flex: 1,
  },

  objectiveCode: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
  },

  objectiveDescription: {
    color: "#8b98b8",
    fontSize: 10,
    marginTop: 3,
  },

  objectiveNumbers: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 50,
    justifyContent: "center",
  },

  currentNumber: {
    color: "#ff2d2d",
    fontSize: 13,
    fontWeight: "900",
  },

  separator: {
    color: "#8b98b8",
    marginHorizontal: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  targetNumber: {
    color: "#526380",
    fontSize: 13,
    fontWeight: "900",
  },

  objectiveRowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  iconActionButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fbff",
  },

  detailButton: {
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fbff",
    flexDirection: "row",
    gap: 5,
  },

  detailButtonText: {
    color: "#0875e1",
    fontSize: 12,
    fontWeight: "800",
  },

  relatedCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dde4f0",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  relatedTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  relatedDescription: {
    color: "#8b98b8",
    fontSize: 12,
    marginTop: 5,
    maxWidth: 230,
  },

  relatedCount: {
    color: "#0875e1",
    fontSize: 11,
    fontWeight: "900",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    maxHeight: "92%",
  },

  modalTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
  },

  modalDescription: {
    color: "#8b98b8",
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
  },

  modalLabel: {
    color: "#44556f",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 8,
  },

  modalInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dde4f0",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f8fbff",
  },

  modalTextArea: {
    height: 78,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 18,
  },

  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: "#edf2fa",
  },

  cancelButtonText: {
    color: "#526380",
    fontWeight: "800",
  },

  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: "#0875e1",
  },

  saveButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  objectiveSelector: {
    gap: 8,
    paddingVertical: 4,
  },

  objectiveSelectorButton: {
    borderWidth: 1,
    borderColor: "#dde4f0",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
  },

  objectiveSelectorButtonActive: {
    backgroundColor: "#0875e1",
    borderColor: "#0875e1",
  },

  objectiveSelectorText: {
    color: "#526380",
    fontSize: 12,
    fontWeight: "900",
  },

  objectiveSelectorTextActive: {
    color: "#ffffff",
  },

  detailModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#edf2fa",
    alignItems: "center",
    justifyContent: "center",
  },

  detailModalContent: {
    gap: 12,
    paddingTop: 18,
    paddingBottom: 8,
  },

  detailObjectiveCard: {
    borderWidth: 1,
    borderColor: "#dde4f0",
    backgroundColor: "#f8fbff",
    borderRadius: 16,
    padding: 14,
  },

  detailObjectiveHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    justifyContent: "space-between",
  },

  detailProgressText: {
    color: "#526380",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 8,
  },

  detailLabel: {
    color: "#44556f",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
  },

  detailValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
  },

  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  infoBox: {
    width: "47%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dde4f0",
    borderRadius: 14,
    padding: 12,
    gap: 5,
  },

  infoBoxLabel: {
    color: "#8b98b8",
    fontSize: 11,
    fontWeight: "800",
  },

  infoBoxValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
  },

  detailNumbersBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dde4f0",
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
  },

  rowActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },

  rowActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dde4f0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  rowDeleteButton: {
    backgroundColor: "#fff1f1",
    borderColor: "#ffc6c6",
  },

  rowActionText: {
    color: "#0875e1",
    fontSize: 11,
    fontWeight: "900",
  },

  rowDeleteText: {
    color: "#ff2d2d",
    fontSize: 11,
    fontWeight: "900",
  },
});