import { useEffect, useState } from "react";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // =================================
  // FETCH INVOICES
  // =================================

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/invoices"
      );

      const data = await response.json();

      if (data.success) {
        setInvoices(data.invoices || []);
      } else {
        setInvoices([]);
      }
    } catch (error) {
      console.error(
        "Failed to fetch invoices:",
        error
      );

      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // INITIAL LOAD
  // =================================

  useEffect(() => {
    fetchInvoices();
  }, []);

  // =================================
  // FORMAT DATE
  // =================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  // =================================
  // GET CUSTOMER NAME
  // =================================

  const getCustomerName = (invoice) => {
    if (invoice.customerName) {
      return invoice.customerName;
    }

    if (invoice.customerId) {
      return invoice.customerId;
    }

    return "Other Customer";
  };

  // =================================
  // GET TOTAL
  // =================================

  const getInvoiceTotal = (invoice) => {
    if (
      typeof invoice.total === "number"
    ) {
      return invoice.total;
    }

    if (Array.isArray(invoice.items)) {
      return invoice.items.reduce(
        (sum, item) =>
          sum +
          (Number(item.amount) || 0),
        0
      );
    }

    return 0;
  };

  // =================================
  // LOADING
  // =================================

  if (loading) {
    return (
      <div className="invoice-list-loading">
        Loading invoices...
      </div>
    );
  }

  // =================================
  // UI
  // =================================

  return (
    <div className="invoice-list">

      <div className="invoice-list-header">

        <div>
          <h2>
            Invoice List
          </h2>

          <p>
            Total Invoices:{" "}
            {invoices.length}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchInvoices}
          className="invoice-refresh-button"
        >
          Refresh
        </button>

      </div>

      <div className="invoice-list-table-wrapper">

        <table className="invoice-list-table">

          <thead>
            <tr>

              <th>
                Invoice No.
              </th>

              <th>
                Date
              </th>

              <th>
                Customer
              </th>

              <th>
                Items
              </th>

              <th>
                Total
              </th>

            </tr>
          </thead>

          <tbody>

            {invoices.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="invoice-empty"
                >
                  No invoices found.
                </td>
              </tr>

            ) : (

              invoices.map(
                (invoice) => (

                  <tr
                    key={invoice._id}
                  >

                    <td>
                      <strong>
                        {invoice.invoiceNo}
                      </strong>
                    </td>

                    <td>
                      {formatDate(
                        invoice.invoiceDate
                      )}
                    </td>

                    <td>
                      {getCustomerName(
                        invoice
                      )}
                    </td>

                    <td>
                      {Array.isArray(
                        invoice.items
                      )
                        ? invoice.items.length
                        : 0}
                    </td>

                    <td>
                      ₹
                      {getInvoiceTotal(
                        invoice
                      ).toFixed(2)}
                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InvoiceList;