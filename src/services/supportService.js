import api from "./api";

export async function fetchSupportTickets() {
  const { data } = await api.get("/support/tickets");
  return data;
}

export async function fetchSupportTicket(id) {
  const { data } = await api.get(`/support/tickets/${id}`);
  return data;
}

export async function createSupportTicket(payload) {
  const { data } = await api.post("/support/tickets", payload);
  return data;
}

export async function replySupportTicket(id, body) {
  const { data } = await api.post(`/support/tickets/${id}/replies`, { body });
  return data;
}
