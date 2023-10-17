import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { GrDocumentUpload } from "react-icons/gr";
import { toast } from "react-toastify";
import Input from "../../helper/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAction,
  updateUserAction,
} from "../../redux/slices/userSlices/userAction";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userStore.data);

  const [edit, setEdit] = useState(false);
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const onUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size / 1000 > 30) {
      toast.warning("Image size is too large (max 30 KB)");
      return;
    }

    const base64 = await convertToBase64(selectedFile);
    setUserImg(base64);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = (values) => {
    if (userImg) {
      values.userImg = userImg;
    }
    dispatch(updateUserAction(values));
    setEdit(false);
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-loginBG">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black">
          Profile Details
        </h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="bg-white w-full md:p-10 sm:p-5 p-2 flex flex-col items-center gap-10">
          <div className="relative w-[80%]">
            <div className="sm:h-[5rem] h-[10rem]" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 sm:-translate-y-[10%] translate-y-[30%] h-[10rem] w-[10rem] rounded-3xl bg-white border-black border-2 overflow-hidden">
              <label htmlFor="userImg">
                {userData && (
                  <>
                    {userImg || userData.userImg ? (
                      <img
                        src={userImg || userData.userImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-base justify-center gap-2 w-full h-full">
                        <GrDocumentUpload size={40} />
                        <span className="text-center">
                          Upload the Image (max 30 KB)
                        </span>
                      </div>
                    )}
                  </>
                )}
                <input
                  type="file"
                  id="userImg"
                  className="hidden"
                  onChange={onUpload}
                />
              </label>
            </div>
            <div className="border-2 border-black pt-20 flex flex-col gap-10 rounded-3xl p-10">
              {userData && (
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    userName: userData.userName,
                    userPhoneNumber: userData.userPhoneNumber,
                    userEmail: userData.userEmail,
                    userPassword: "",
                    userAddress: userData.userAddress,
                  }}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form className="flex flex-col gap-5">
                      <Input name="userName" type="text" label="Name" />
                      <Input
                        name="userPhoneNumber"
                        type="text"
                        label="Phone Number"
                      />
                      {edit && (
                        <Input
                          name="userPassword"
                          type="password"
                          label="Password"
                        />
                      )}
                      <Input name="userAddress" type="text" label="Address" />
                      {edit ? (
                        <div className="flex justify-between w-full">
                          <button
                            type="submit"
                            className="text-center bg-blue-700 text-white w-[10rem] p-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleEdit}
                            className="text-center bg-red-700 text-white w-[10rem] p-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="text-center bg-blue-700 text-white w-[10rem] p-2 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
