import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { LiaSaveSolid } from "react-icons/lia";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ phoneNumber: "", city: "", pincode: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/auth/user", { credentials: "include" });
      const data = await res.json();
      if (data.loggedIn) {
        setUser(data.user);
        setForm({
          phoneNumber: data.user.phoneNumber || "",
          city: data.user.city || "",
          pincode: data.user.pincode || "",
        });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/auth/logout", { credentials: "include" });
    setUser(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/auth/update-user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setIsEditing(false);
    toast.success("Details updated successfully!");
  };

  function handleSignIn(){
    window.location.href = "/auth/google";
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      {user ? (
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500">
              {user.profileImg ? (
                <img
                  src={user.profileImg}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl bg-gray-200">
                  👤
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mt-4">
              {`${user.firstName} ${user.lastName}`}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              {isEditing ? (
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="mt-1 text-gray-800">
                  {form.phoneNumber || "Not set"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              {isEditing ? (
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="mt-1 text-gray-800">{form.city || "Not set"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              {isEditing ? (
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ) : (
                <p className="mt-1 text-gray-800">
                  {form.pincode || "Not set"}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6 space-x-2">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <LiaSaveSolid className="text-xl mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    <MdCancel className="text-xl mx-auto" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaUserEdit className="text-xl mx-auto" />
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                <CiLogout className="text-xl mx-auto" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-xl p-8 text-center max-w-sm w-full">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-4">Please log in to continue</p>
          <div onClick={handleSignIn} className="flex items-center gap-2 cursor-pointer justify-center p-2 rounded shadow border transition-transform duration-300 ease-in-out hover:scale-105 border-slate-300 ">
            <div className="w-5 h-5 ">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png"
                alt="Placeholder"
                className="w-full object-cover"
              />
            </div>
            <p className="text-slate-600  font-semibold ">
              Sign in with Google
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
