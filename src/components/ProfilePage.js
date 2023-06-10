import React, { useState } from "react";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [avatar, setAvatar] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const [password, setPassword] = useState("");

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here

    // For simplicity, let's just log the updated data
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Avatar: ${avatar}`);
    console.log(`Password: ${password}`);

    setIsEditMode(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="my-6 text-3xl font-extrabold italic text-gray-600">
        Listy
      </h1>

      <div className="flex flex-col justify-center items-center mb-4">
        <img
          src={avatar || "default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full mr-4 mb-3"
        />

        <div className="flex flex-col justify-center items-center">
          {isEditMode ? (
            <input
              type="text"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h2 className="text-xl font-bold">{name}</h2>
          )}

          {isEditMode ? (
            <input
              type="email"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}

          {isEditMode && (
            <div>
              <input
                className="w-full"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  // Perform upload logic here, e.g., using FileReader API
                  setAvatar(URL.createObjectURL(file));
                }}
              />
            </div>
          )}

          {isEditMode && (
            <input
              type="password"
              className="border rounded py-2 px-3 mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>

        {isEditMode ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 my-3 py-2 rounded"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 my-3 py-2 rounded"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>

      {/* {isEditMode ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleEditClick}
        >
          Edit
        </button>
      )} */}
    </div>
  );
};

export default ProfilePage;
