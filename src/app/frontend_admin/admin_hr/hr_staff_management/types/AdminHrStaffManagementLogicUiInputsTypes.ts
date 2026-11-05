// RESPONSIBILITY: UI inputs required by HR staff lifecycle orchestration.
export interface AdminHrLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
}
