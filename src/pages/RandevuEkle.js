import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import Header from "../compoenents/Header";

import api from "../api/api";
import urls from "../api/urls";

const RandevuEkle = (props) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hastalar, setHastalar] = useState(null);
  const [hasHasta, setHasHasta] = useState(false);
  const [randevular, setRandevular] = useState(null);

  useEffect(() => {
    api
      .get(urls.hastalar)
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log(err));
    api
      .get(urls.randevular)
      .then((res) => setRandevular(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
    if (
      date === "" ||
      phone === "" ||
      name === "" ||
      surname === "" ||
      sikayet === ""
    ) {
      alert("Bütün alanları girmek zorunludur");
    }
    if (phone.length !== 11) {
      alert("Telefon numarası 11 hane olmak zorundadır");
      return;
    }
    const isAvailableDate = randevular.find((item) => item.date === date);

    if (isAvailableDate !== undefined) {
      alert("Bu randevu günü ve saati doludur");
      return;
    }
    if (hasHasta) {
      const newRandevu = {
        id: String(new Date().getTime()),
        date: date,
        hastaId: hasHasta.id,
      };
      const newIslem = {
        id: String(new Date().getTime() + 1),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const updatedHasta = {
        ...hasHasta,
        islemIds: [...hasHasta.islemIds, newIslem.id],
      };
      api
        .post(urls.randevular, newRandevu)
        .then((res) => {
          console.log("randevu kayıt", res);
        })
        .catch((err) => console.log(err));
      api
        .post(urls.islemler, newIslem)
        .then((res) => {
          console.log("işlem kayıt", res);
        })
        .catch((err) => console.log(err));
      api
        .put(`${urls.hastalar}/{hasHasta.id}`, updatedHasta)
        .then((res) => {
          console.log("hasta update", res);
        })
        .catch((err) => console.log(err));
      navigate("/");
    } else {
      const newIslem = {
        id: String(new Date().getTime()),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const newHasta = {
        id: String(new Date().getTime()),
        name: name,
        surname: surname,
        islemIds: [newIslem.id],
        phone: phone,
      };
      const newRandevu = {
        id: String(new Date().getTime() + 2),
        date: date,
        hastaId: newHasta.id,
      };
      api
        .post(urls.randevular, newRandevu)
        .then((res) => {
          console.log("randevu kayıt", res);
        })
        .catch((err) => console.log(err));
      api
        .post(urls.islemler, newIslem)
        .then((res) => {
          console.log("işlem kayıt", res);
        })
        .catch((err) => console.log(err));
      api
        .post(urls.hastalar, newHasta)
        .then((res) => {
          console.log("hasta kayıt", res);
        })
        .catch((err) => console.log(err));
      navigate("/");
    }
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const arananHasta = hastalar.find(
      (item) => item.phone === String(event.target.value)
    );
    if (arananHasta !== undefined) {
      setName(arananHasta.name);
      setSurname(arananHasta.surname);
      setHasHasta(arananHasta);
    } else {
      setName("");
      setSurname("");
      setHasHasta(false);
    }
  };
  if (hastalar === null || randevular === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <input
            value={date}
            defaultValue={new Date("dd/mm/yyyy hh:mm")}
            onChange={(event) => setDate(event.target.value)}
            type={"datetime-local"}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"number"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Telefon Numarası"
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={hasHasta}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            disabled={hasHasta}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Şikayet"
            variant="outlined"
            value={sikayet}
            onChange={(event) => setSikayet(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button type="submit" variant="contained">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RandevuEkle;
