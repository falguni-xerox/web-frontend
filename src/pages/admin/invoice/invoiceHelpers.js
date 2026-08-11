// =================================
// INVOICE TOTAL
// =================================

export const calculateInvoiceTotal = (items = []) => {
  return items.reduce(
    (sum, item) =>
      sum +
      (Number(item.qty) || 0) *
        (Number(item.rate) || 0),
    0
  );
};


// =================================
// VALIDATE INVOICE ITEMS
// =================================

export const validateInvoiceItems = (
  items = []
) => {
  const validItems = items.filter(
    (item) =>
      item.description &&
      item.description.trim() &&
      Number(item.qty) > 0 &&
      Number(item.rate) >= 0
  );

  return validItems;
};


// =================================
// PREPARE INVOICE ITEMS
// =================================

export const prepareInvoiceItems = (
  items = []
) => {
  return items.map((item) => ({
    description: item.description.trim(),
    qty: Number(item.qty),
    rate: Number(item.rate),
    amount:
      Number(item.qty) *
      Number(item.rate),
  }));
};


// =================================
// CREATE INVOICE API
// =================================

export const createInvoice = async ({
  invoiceDate,
  customerId,
  customerName,
  items,
  total,
}) => {
  const response = await fetch(
    "http://localhost:5000/api/invoices",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        invoiceDate,
        customerId,
        customerName,
        items,
        total,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to create invoice."
    );
  }

  return data;
};