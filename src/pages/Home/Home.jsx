import { NavLink } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { subDays, addDays, setHours, setMinutes } from "date-fns";
import { Button } from "../../components/Button/Button";
import Select from "react-select";
import { Modal } from "../../components/Modal/Modal";
import { ModalContent } from "../../components/ModalContent/ModalContent";
import style from "./home.module.css";
import { customStyles } from "./SelectStyles";

export const Home = () => {
  // form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    clientEmail: "",
    date: new Date(),
    service: null,
  });

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleServiceChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({
        ...formData,
        service: selectedOption.value,
      });
    } else {
      setFormData({
        ...formData,
        service: null,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // register client's visit API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/registerAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Klientas užregistruotas");
        window.location.href = "http://localhost:3000/";
      } else {
        alert("Registracija nepavyko");
      }
    } catch (error) {
      alert(error);
    }
  };

  const options = [
    { value: "Plaukų kirpimas", label: "Plaukų kirpimas" },
    { value: "Vestuvinis paketas", label: "Vestuvinis paketas" },
    { value: "Barzdos tvarkymas", label: "Barzdos tvarkymas" },
  ];

  // -------------------------------------------------------------------
  // fetch all appointments
  // -------------------------------------------------------------------
  const [fetchedAppointments, setFetchedAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/getClients"
      );
      if (response.ok && localStorage.getItem("user")) {
        const data = await response.json();
        setFetchedAppointments(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  // -------------------------------------------------------------------
  // edit and delete appointments
  // -------------------------------------------------------------------
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [editedDate, setEditedDate] = useState(formData.date);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleDeleteAppointment = (clientId, appointmentId) => {
    setSelectedClientId(clientId);
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/updateAppointment/${selectedClientId}/${selectedAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "delete" }),
        }
      );
      if (response.ok) {
        fetchAppointments();
      } else {
        alert("Deletion failed");
      }
    } catch (error) {
      alert(error);
    }

    setShowModal(false);
  };

  const handleEditAppointment = (appointmentId) => {
    setIsDatePickerVisible(!isDatePickerVisible);
    setSelectedAppointment(appointmentId);
  };

  const applyEditAppointment = async (clientId, appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/updateAppointment/${clientId}/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "updateDate", date: editedDate }),
        }
      );
      if (response.ok) {
        fetchAppointments();
        setIsDatePickerVisible(false);
      } else {
        alert("Edit failed");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={style.bodyWrapper}>
        <h1 className={style.h1Text}>KLIENTŲ REGISTRAVIMO SISTEMA</h1>
        {!localStorage.getItem("user") && (
          <>
            <p className={style.descriptionToLogin}>
              Norint užregistruoti klientą jo grožio procedūroms, pirmiausia
              prisijunkite arba užsiregistruokite
            </p>
            <div className={style.navLinksButtons}>
              <NavLink to="/register">REGISTRUOTIS</NavLink>
              <NavLink to="/login">PRISIJUNGTI</NavLink>
            </div>
          </>
        )}
      </div>
      {localStorage.getItem("user") && (
        <div className={style.clientRegistrationWrapper}>
          <p className={style.sectionDescription}>UŽREGISTRUOK KLIENTĄ</p>
          <Form
            onSubmit={handleSubmit}
            className={style.registrationFormWrapper}
          >
            <div className={style.inputWrapper}>
              <Input
                type="text"
                inputName="firstName"
                placeHolder="Vardas"
                value={formData.firstName}
                onChange={handleChange}
                className={style.clientFirstNameInput}
              />
              <Input
                type="text"
                inputName="lastName"
                placeHolder="Pavardė"
                className={style.clientLastNameInput}
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                type="email"
                inputName="clientEmail"
                placeHolder="El. Paštas"
                className={style.clientEmailInput}
                value={formData.clientEmail}
                onChange={handleChange}
              />
              <Select
                styles={customStyles}
                options={options}
                value={formData.service}
                onChange={(selectedOption) =>
                  handleServiceChange(selectedOption)
                }
                placeholder={
                  formData.service
                    ? formData.service
                    : "Pasirinkite paslauga..."
                }
              />
              <Button
                buttonText="Užregistruoti klientą"
                type="submit"
                className={style.registerClientBtn}
              />
            </div>

            <DatePicker
              className={style.datePicker}
              selected={formData.date}
              onChange={handleDateChange}
              inline
              placeholderText="Pasirinkite datą..."
              name="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
              includeDateIntervals={[
                { start: subDays(new Date(), 1), end: addDays(new Date(), 60) },
              ]}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
              filterTime={filterPassedTime}
            />
          </Form>
        </div>
      )}
      {localStorage.getItem("user") && (
        <div>
          <p className={style.sectionDescription}>ESAMOS REGISTRACIJOS</p>
          <table>
            <thead>
              <tr>
                <th className={style.tableHeadName}>VARDAS</th>
                <th className={style.tableHeadSurname}>PAVARDĖ</th>
                <th className={style.tableHeadEmail}>EL. PAŠTAS</th>
                <th className={style.tableHeadAppointment}>VIZITAS</th>
              </tr>
            </thead>
            <tbody>
              {fetchedAppointments
                .filter((client) => client.appointments.length > 0)
                .map((client, index) => (
                  <tr key={index}>
                    <td>{client.firstName}</td>
                    <td>{client.lastName}</td>
                    <td>{client.clientEmail}</td>
                    <td>
                      {client.appointments.map((appointment) => (
                        <div
                          key={appointment._id}
                          className={style.appointmentsWrapper}
                        >
                          <span className={style.appointmentService}>
                            {appointment.service}
                          </span>
                          <span className={style.appointmentDate}>
                            {new Date(appointment.date).toLocaleString(
                              "lt-LT",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          <span className={style.appointmentEditBtnWrapper}>
                            <Button
                              className={style.editAppointmentBtn}
                              buttonText="Redaguoti"
                              onClick={() =>
                                handleEditAppointment(appointment._id)
                              }
                            />
                          </span>
                          <span className={style.appointmentEditBtnWrapper}>
                            <Button
                              className={style.deleteAppointmentBtn}
                              buttonText="Ištrinti"
                              onClick={() =>
                                handleDeleteAppointment(
                                  client._id,
                                  appointment._id
                                )
                              }
                            />
                            {/* SHOWING MODAL AFTER PRESSING DELETE */}
                            {showModal && (
                              <Modal onClose={handleCloseModal}>
                                <ModalContent
                                  onCancel={handleCloseModal}
                                  onConfirm={confirmDelete}
                                  acceptBtnClass={style.modalAcceptBtn}
                                  cancelBtnClass={style.modalCancelBtn}
                                  modalBtnWrapperClass={style.modalBtnWrapper}
                                >
                                  <h2 className={style.modalHeader}>
                                    AR TIKRAI NORITE IŠTRINTI ŠĮ KLIENTO VIZITĄ?
                                  </h2>
                                </ModalContent>
                              </Modal>
                            )}
                          </span>
                          {selectedAppointment === appointment._id &&
                            isDatePickerVisible && (
                              <div>
                                <DatePicker
                                  calendarClassName={style.editDatePicker}
                                  selected={editedDate}
                                  onChange={setEditedDate}
                                  inline
                                  placeholderText="Pasirinkite datą..."
                                  name="date"
                                  showTimeSelect
                                  timeFormat="HH:mm"
                                  timeIntervals={30}
                                  timeCaption="time"
                                  dateFormat="MMMM d, yyyy HH:mm"
                                  includeDateIntervals={[
                                    {
                                      start: subDays(new Date(), 1),
                                      end: addDays(new Date(), 60),
                                    },
                                  ]}
                                  minTime={setHours(
                                    setMinutes(new Date(), 0),
                                    9
                                  )}
                                  maxTime={setHours(
                                    setMinutes(new Date(), 30),
                                    20
                                  )}
                                  filterTime={filterPassedTime}
                                />
                                <div className={style.editBtnWrapper}>
                                  <Button
                                    className={style.editApplyBtn}
                                    buttonText="Patvirtinti"
                                    onClick={() =>
                                      applyEditAppointment(
                                        client._id,
                                        appointment._id
                                      )
                                    }
                                  />
                                  <Button
                                    className={style.editCancelBtn}
                                    buttonText="Atšaukti"
                                    onClick={() =>
                                      handleEditAppointment(appointment._id)
                                    }
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
