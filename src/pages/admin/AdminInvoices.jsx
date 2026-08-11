import { useEffect, useState } from "react";

function AdminInvoices() {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);

  const [customerId, setCustomerId] = useState("");
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
    },
  ]);

  // =================================
  // FETCH CUSTOMERS
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
        console.error("Failed to fetch customers:", error);
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
        console.error("Failed to fetch invoice services:", error);
      }
    };

    fetchServices();
  }, []);

  // =================================
  // ITEM CHANGE
  // =================================

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const updated = {
          ...item,
          [field]: value,
        };

        if (field === "qty" || field === "rate") {
          const qty = Number(updated.qty) || 0;
          const rate = Number(updated.rate) || 0;

          updated.amount = qty * rate;
        }

        return updated;
      })
    );
  };

  // =================================
  // SERVICE SELECT
  // =================================

  const handleServiceChange = (index, value) => {
    if (value === "__manual__") {
      setItems((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                description: "",
                rate: "",
                amount: 0,
                manual: true,
              }
            : item
        )
      );

      return;
    }

    const service = services.find(
      (item) => item._id === value
    );

    if (!service) return;

    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const qty = Number(item.qty) || 0;
        const rate = Number(service.defaultRate) || 0;

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
      },
    ]);
  };

  // =================================
  // REMOVE ITEM
  // =================================

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =================================
  // TOTAL
  // =================================

  const total = items.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  // =================================
  // UI
  // =================================

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Create Invoice
          </h1>

          <p className="text-gray-500 mt-1">
            Falguni Xerox & Computer Work
          </p>
        </div>

        {/* CUSTOMER / DATE */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Customer
              </label>

              <select
                value={customerId}
                onChange={(e) =>
                  setCustomerId(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">
                  Select Regular Customer
                </option>

                {customers.map((customer) => (
                  <option
                    key={customer._id}
                    value={customer._id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Invoice Date
              </label>

              <input
                type="date"
                value={invoiceDate}
                onChange={(e) =>
                  setInvoiceDate(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>
        </div>

        {/* ITEMS */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Invoice Items
            </h2>

            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              + Add Item
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="border-b">

                  <th className="text-left p-3">
                    S.No
                  </th>

                  <th className="text-left p-3">
                    Description
                  </th>

                  <th className="text-left p-3">
                    Qty
                  </th>

                  <th className="text-left p-3">
                    Rate
                  </th>

                  <th className="text-right p-3">
                    Amount
                  </th>

                  <th className="p-3">
                  </th>

                </tr>
              </thead>

              <tbody>

                {items.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3">

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
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option value="">
                            Select Service
                          </option>

                          {services.map((service) => (
                            <option
                              key={service._id}
                              value={service._id}
                            >
                              {service.name}
                            </option>
                          ))}

                          <option value="__manual__">
                            Manual Description
                          </option>

                        </select>
                      ) : (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter description"
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      )}

                    </td>

                    <td className="p-3">

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
                        className="w-24 border rounded-lg px-3 py-2"
                      />

                    </td>

                    <td className="p-3">

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
                        className="w-28 border rounded-lg px-3 py-2"
                      />

                    </td>

                    <td className="p-3 text-right font-semibold">
                      ₹
                      {Number(item.amount || 0).toFixed(2)}
                    </td>

                    <td className="p-3 text-center">

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(index)
                        }
                        className="text-red-600"
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* TOTAL */}

          <div className="flex justify-end mt-6">

            <div className="text-right">

              <div className="text-gray-500">
                TOTAL
              </div>

              <div className="text-3xl font-bold">
                ₹{total.toFixed(2)}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminInvoices;