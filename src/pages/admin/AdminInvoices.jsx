import { useEffect, useState } from "react";
import InvoiceActions from "./invoice/InvoiceActions";
import InvoiceList from "./invoice/InvoiceList";
import "./AdminInvoices.css";

import {
  calculateInvoiceTotal,
  validateInvoiceItems,
  prepareInvoiceItems,
  createInvoice,
} from "./invoice/invoiceHelpers";

function AdminInvoices() {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [isOtherCustomer, setIsOtherCustomer] =
    useState(false);

  const [otherCustomer, setOtherCustomer] = useState({
    name: "",
  });

  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [items, setItems] = useState([
    {
      description: "",
      qty: 1,
      rate: "",
      amount: 0,
      manual: false,
      serviceId: "",
    },
  ]);

  // =================================
  // FETCH REGULAR CUSTOMERS
  // =================================

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/customers"
        );

        const data = await response.json();

        if (data.success) {
          setCustomers(data.customers || []);
        }
      } catch (error) {
        console.error(
          "Failed to fetch customers:",
          error
        );
      }
    };

    fetchCustomers();
  }, []);

  // =================================
  // FETCH INVOICE SERVICES
  // =================================

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/invoice-services/active"
        );

        const data = await response.json();

        if (data.success) {
          setServices(data.services || []);
        }
      } catch (error) {
        console.error(
          "Failed to fetch invoice services:",
          error
        );
      }
    };

    fetchServices();
  }, []);

  // =================================
  // CUSTOMER CHANGE
  // =================================

  const handleCustomerChange = (value) => {
    if (value === "__other__") {
      setCustomerId("");
      setIsOtherCustomer(true);

      setOtherCustomer({
        name: "",
      });

      return;
    }

    setCustomerId(value);
    setIsOtherCustomer(false);

    setOtherCustomer({
      name: "",
    });
  };

  // =================================
  // OTHER CUSTOMER UPDATE
  // =================================

  const updateOtherCustomer = (field, value) => {
    setOtherCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =================================
  // UPDATE ITEM
  // =================================

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        const updated = {
          ...item,
          [field]: value,
        };

        if (
          field === "qty" ||
          field === "rate"
        ) {
          const qty =
            Number(updated.qty) || 0;

          const rate =
            Number(updated.rate) || 0;

          updated.amount = qty * rate;
        }

        return updated;
      })
    );
  };

  // =================================
  // SERVICE CHANGE
  // =================================

  const handleServiceChange = (index, value) => {
    // =================================
    // MANUAL DESCRIPTION
    // =================================

    if (value === "__manual__") {
      setItems((prev) =>
        prev.map((item, i) => {
          if (i !== index) {
            return item;
          }

          return {
            ...item,
            description: "",
            rate: "",
            amount: 0,
            manual: true,
            serviceId: "",
          };
        })
      );

      return;
    }

    // =================================
    // EMPTY SERVICE
    // =================================

    if (!value) {
      setItems((prev) =>
        prev.map((item, i) => {
          if (i !== index) {
            return item;
          }

          return {
            ...item,
            description: "",
            rate: "",
            amount: 0,
            manual: false,
            serviceId: "",
          };
        })
      );

      return;
    }

    // =================================
    // FIND SERVICE
    // =================================

    const service = services.find(
      (item) => item._id === value
    );

    if (!service) {
      return;
    }

    // =================================
    // SET SERVICE
    // =================================

    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        const qty =
          Number(item.qty) || 0;

        const rate =
          Number(service.defaultRate) || 0;

        return {
          ...item,
          description: service.name,
          rate,
          amount: qty * rate,
          manual: false,
          serviceId: service._id,
        };
      })
    );
  };

  // =================================
  // ADD ITEM
  // =================================

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: "",
        qty: 1,
        rate: "",
        amount: 0,
        manual: false,
        serviceId: "",
      },
    ]);
  };

  // =================================
  // REMOVE ITEM
  // =================================

  const removeItem = (index) => {
    if (items.length === 1) {
      return;
    }

    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =================================
  // CREATE INVOICE
  // =================================

  const handleCreateInvoice = async () => {
    try {
      // =================================
      // CUSTOMER VALIDATION
      // =================================

      if (!customerId && !isOtherCustomer) {
        alert("Please select a customer.");
        return;
      }

      // =================================
      // OTHER CUSTOMER VALIDATION
      // =================================

      if (
        isOtherCustomer &&
        !otherCustomer.name.trim()
      ) {
        alert("Please enter customer name.");
        return;
      }

      // =================================
      // VALIDATE ITEMS
      // =================================

      const validItems =
        validateInvoiceItems(items);

      if (validItems.length === 0) {
        alert(
          "Please add at least one invoice item."
        );
        return;
      }

      // =================================
      // PREPARE CUSTOMER NAME
      // =================================

      let customerName = "";

      if (isOtherCustomer) {
        customerName =
          otherCustomer.name.trim();
      } else {
        const selectedCustomer =
          customers.find(
            (customer) =>
              customer._id === customerId
          );

        customerName =
          selectedCustomer?.name || "";
      }

      // =================================
      // PREPARE INVOICE ITEMS
      // =================================

      const invoiceItems =
        prepareInvoiceItems(validItems);

      // =================================
      // CALCULATE TOTAL
      // =================================

      const invoiceTotal =
        calculateInvoiceTotal(invoiceItems);

      // =================================
      // CREATE INVOICE
      // =================================

      const data = await createInvoice({
        invoiceDate,

        customerId: isOtherCustomer
          ? ""
          : customerId,

        customerName,

        items: invoiceItems,

        total: invoiceTotal,
      });

      // =================================
      // SUCCESS
      // =================================

      alert(
        `Invoice ${
          data.invoice?.invoiceNo || ""
        } created successfully.`
      );

      // =================================
      // RESET CUSTOMER
      // =================================

      setCustomerId("");
      setIsOtherCustomer(false);

      setOtherCustomer({
        name: "",
      });

      // =================================
      // RESET ITEMS
      // =================================

      setItems([
        {
          description: "",
          qty: 1,
          rate: "",
          amount: 0,
          manual: false,
          serviceId: "",
        },
      ]);
    } catch (error) {
      console.error(
        "Create invoice error:",
        error
      );

      alert(
        error.message ||
          "Failed to create invoice."
      );
    }
  };

  // =================================
  // TOTAL
  // =================================

  const total = items.reduce(
    (sum, item) =>
      sum + (Number(item.amount) || 0),
    0
  );

  // =================================
  // UI
  // =================================

  return (
    <div className="invoice-page">
      <div className="invoice-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="invoice-header">
          <div>
            <h1 className="invoice-title">
              Create Invoice
            </h1>

            <p className="invoice-subtitle">
              Falguni Xerox & Computer Work
            </p>
          </div>
        </div>

        {/* =================================
            CUSTOMER + DATE
        ================================= */}

        <div className="invoice-card">

          <div className="invoice-info-grid">

            {/* CUSTOMER */}

            <div className="invoice-field">
              <label>
                Customer
              </label>

              <select
                value={
                  isOtherCustomer
                    ? "__other__"
                    : customerId
                }
                onChange={(e) =>
                  handleCustomerChange(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map(
                  (customer) => (
                    <option
                      key={customer._id}
                      value={customer._id}
                    >
                      {customer.name}
                    </option>
                  )
                )}

                <option value="__other__">
                  Other Customer
                </option>
              </select>
            </div>

            {/* DATE */}

            <div className="invoice-field">
              <label>
                Invoice Date
              </label>

              <input
                type="date"
                value={invoiceDate}
                onChange={(e) =>
                  setInvoiceDate(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          {/* =================================
              OTHER CUSTOMER
          ================================= */}

          {isOtherCustomer && (
            <div className="other-customer-box">

              <div className="other-customer-title">
                Other Customer Details
              </div>

              <div className="other-customer-grid">

                <div className="invoice-field">
                  <label>
                    Customer Name
                  </label>

                  <input
                    type="text"
                    value={
                      otherCustomer.name
                    }
                    onChange={(e) =>
                      updateOtherCustomer(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Enter customer name"
                  />
                </div>

              </div>

            </div>
          )}

        </div>

        {/* =================================
            INVOICE ITEMS
        ================================= */}

        <div className="invoice-card">

          <div className="items-header">

            <h2 className="items-title">
              Invoice Items
            </h2>

            <button
              type="button"
              onClick={addItem}
              className="add-item-button"
            >
              + Add Item
            </button>

          </div>

          <div className="invoice-table-wrapper">

            <table className="invoice-table">

              <thead>
                <tr>

                  <th className="serial-number">
                    S.No
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Qty
                  </th>

                  <th>
                    Rate
                  </th>

                  <th
                    style={{
                      textAlign: "right",
                    }}
                  >
                    Amount
                  </th>

                  <th
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {items.map(
                  (item, index) => (

                    <tr key={index}>

                      {/* S.NO */}

                      <td className="serial-number">
                        {index + 1}
                      </td>

                      {/* DESCRIPTION */}

                      <td>

                        {!item.manual ? (

                          <select
                            value={
                              item.serviceId || ""
                            }
                            onChange={(e) =>
                              handleServiceChange(
                                index,
                                e.target.value
                              )
                            }
                            className="invoice-item-select"
                          >

                            <option value="">
                              Select Service
                            </option>

                            {services.map(
                              (service) => (
                                <option
                                  key={
                                    service._id
                                  }
                                  value={
                                    service._id
                                  }
                                >
                                  {service.name}
                                </option>
                              )
                            )}

                            <option value="__manual__">
                              Manual Description
                            </option>

                          </select>

                        ) : (

                          <input
                            type="text"
                            value={
                              item.description
                            }
                            onChange={(e) =>
                              updateItem(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Enter description"
                            className="invoice-item-input"
                          />

                        )}

                      </td>

                      {/* QTY */}

                      <td>

                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "qty",
                              e.target.value
                            )
                          }
                          className="invoice-item-input qty-input"
                        />

                      </td>

                      {/* RATE */}

                      <td>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "rate",
                              e.target.value
                            )
                          }
                          className="invoice-item-input rate-input"
                        />

                      </td>

                      {/* AMOUNT */}

                      <td className="amount-cell">

                        &#8377;
                        {Number(
                          item.amount || 0
                        ).toFixed(2)}

                      </td>

                      {/* REMOVE */}

                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(index)
                          }
                          className="remove-item-button"
                        >
                          Remove
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          {/* =================================
              TOTAL
          ================================= */}

          <div className="total-section">

            <div className="total-box">

              <div className="total-label">
                TOTAL
              </div>

              <div className="total-value">
                &#8377;
                {total.toFixed(2)}
              </div>

            </div>

          </div>

          {/* =================================
              CREATE INVOICE
          ================================= */}

          <InvoiceActions
            onCreateInvoice={
              handleCreateInvoice
            }
          />

        </div>

      </div>

      {/* =================================
          INVOICE LIST
      ================================= */}

      <InvoiceList />

    </div>
  );
}

export default AdminInvoices;