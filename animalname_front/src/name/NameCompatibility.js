import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "../name/name.css";
import "../component/formFrm.css";
import { useState } from "react";
import { Button1, Button2 } from "../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { RWebShare } from "react-web-share";

const NameCompatibility = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [compatibilityResult, setCompatibilityResult] = useState({});
  const [img, setImg] = useState("");
  const handleChange1 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류  ",
        text: "한글만 입력 가능합니다.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    } else {
      setName1(input);
      setCompatibilityResult({}); // 결과 초기화
    }
  };

  const handleChange2 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류",
        text: "한글만 입력 가능합니다.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    } else {
      setName2(input);
      setCompatibilityResult({}); // 결과 초기화
    }
  };

  const compa = () => {
    if (name1 === "" || name2 === "") {
      Swal.fire({
        title: "이름 입력 필수",
        text: "이름을 모두 입력해주세요.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    }
    axios
      .get(backServer + "/animalname/compatibility/" + name1 + "/" + name2)
      .then((res) => {
        console.log(res.data.data);
        setCompatibilityResult(res.data.data);
      })
      .catch((res) => {});
  };

  return (
    <div className="name-compatibility-wrap">
      <div className="name-compatibility-title">
        <h2 className="sub-title">이름 궁합</h2>
        <p>2024년 멍냥이와의 궁합을 확인해보세요.</p>
      </div>
      <div className="name-compatibility-input-wrap">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="도넛 🐶"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name1}
            onChange={handleChange1}
          />
        </Paper>
        <span>🩷</span>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="김시하 🧑‍🦰"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name2}
            onChange={handleChange2}
          />
        </Paper>
      </div>
      <div>
        <Button1
          text="궁합 검사 "
          id="name-compatibility-btn"
          clickEvent={compa}
        />
      </div>
      <div className="name-compatibility-result">
        {" "}
        {Object.keys(compatibilityResult).length === 0 ? (
          ""
        ) : (
          <>
            <h3 className="luck-title">
              {name1} <span style={{ fontWeight: 400 }}>님과</span> {name2}
              {""} <span style={{ fontWeight: 400 }}>님의 궁합</span> 🍀
            </h3>
            <img src="../image/result.png" alt="dog-compatibility" />
            <p id="compatibility-score-title" style={{ fontSize: "16px" }}>
              궁합점수 <span>{compatibilityResult.compatibilityScore}</span>점
            </p>
            <p className="test-result">
              {compatibilityResult.compatibilityResult}
            </p>
            <br />
            <br />
            <div>
              <RWebShare
                data={{
                  text:
                    { name1 } +
                    "님과 " +
                    { name2 } +
                    "님의 궁합점수는 " +
                    `${compatibilityResult.compatibilityScore}` +
                    "점입니다.",
                  url: "https://www.petname.site",
                  title: "한국 동물이름 순위",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button className="btn st2">공유하기 🔗</button>
              </RWebShare>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NameCompatibility;
