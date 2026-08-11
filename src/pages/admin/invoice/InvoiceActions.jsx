function InvoiceActions({
  onCreateInvoice,
  saving = false,
}) {
  return (
    <div className="create-invoice-section">
      <button
        type="button"
        onClick={onCreateInvoice}
        className="create-invoice-button"
        disabled={saving}
      >
        {saving ? "Creating Invoice..." : "Create Invoice"}
      </button>
    </div>
  );
}

export default InvoiceActions;