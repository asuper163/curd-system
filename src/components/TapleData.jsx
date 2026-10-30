import axios from "axios";
import {SquarePen, Trash} from "lucide-react";
import {useEffect, useState} from "react";

export default function TableData() {
  const domain = "https://jsonplaceholder.typicode.com";
  const endpoint = "/users";

  const [dataFromBackEnd, setDataFromBackEnd] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    city: "",
    street: "",
    suite: "",
  });

  useEffect(() => {
    axios.get(`${domain}${endpoint}`).then((response) => {
      setDataFromBackEnd(response.data);
    });
  }, []);

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      city: user.address.city,
      street: user.address.street,
      suite: user.address.suite,
    });
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDataFromBackEnd((previousData) =>
      previousData.map((user) =>
        user.id === formData.id
          ? {
              ...user,
              name: formData.name,
              address: {
                ...user.address,
                city: formData.city,
                street: formData.street,
                suite: formData.suite,
              },
            }
          : user,
      ),
    );

    handleReset();
  };

  const handleReset = () => {
    setFormData({
      id: null,
      name: "",
      city: "",
      street: "",
      suite: "",
    });
  };

  const handleDelete = (id) => {
    setDataFromBackEnd((previousData) =>
      previousData.filter((user) => user.id !== id),
    );

    if (formData.id === id) {
      handleReset();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-6"
      >
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className=" input "
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </fieldset>

        <label className="fieldset">
          <span className="label">City</span>
          <input
            type="text"
            name="city"
            className=" input "
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>

        <label className="fieldset">
          <span className="label">Street</span>
          <input
            type="text"
            name="street"
            className=" input "
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </label>

        <label className="fieldset">
          <span className="label">Suite</span>
          <input
            type="text"
            name="suite"
            className=" input "
            placeholder="Suite"
            value={formData.suite}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className="btn btn-neutral mt-4"
          type="submit"
          disabled={formData.id === null}
        >
          Update
        </button>

        <button
          className="btn btn-ghost mt-1"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Street</th>
              <th>Suite</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {dataFromBackEnd.map((user, index) => (
              <tr key={user.id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.address.city}</td>
                <td>{user.address.street}</td>
                <td>{user.address.suite}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash size={18} />
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(user)}
                  >
                    <SquarePen size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
