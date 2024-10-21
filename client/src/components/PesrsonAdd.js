import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Pesrson(props) {
    const {id} = useParams();
    const [info, setInfo] = useState({
        name: '',
        phone: '',
        addr: '',
        gender: '',
    });
    
    const nameRef = useRef("");
    const phoneRef = useRef("");
    const addrRef = useRef("");
    const navigate = useNavigate("");

    function handleChange(e){
        setInfo({...info, gender: e.target.value});
    }

    async function fnAdd() {
        const name = nameRef.current.value;
        const gender = info.gender;
        const phone = phoneRef.current.value;
        const addr = addrRef.current.value;
        try {
            const res = await axios.post(`http://localhost:3100/person`, {
                name, gender, phone, addr
            });
            alert(res.data.message);
            if(res.data.success) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fnEdit() {
        const name = nameRef.current.value;
        const gender = info.gender;
        const phone = phoneRef.current.value;
        const addr = addrRef.current.value;
        console.log(gender);
        try {
            const res = await axios.put(`http://localhost:3100/person/${id}`, {
                name, gender, phone, addr
            });
            alert(res.data.message);
            if(res.data.success) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(id !== undefined) fnInfo();
    }, []);

    async function fnInfo() {
        try {
            const res = await axios.get(`http://localhost:3100/person/${id}`);
            if(res.data.success) {
                setInfo(res.data.list[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type='text' ref={nameRef} value={info.name}  onChange={(e) => setInfo({ ...info, name: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <label><input type='radio' name="gender" value="M" onChange={handleChange} checked={info.gender === "M"} />남</label>
                            <label><input type='radio' name="gender" value="F" onChange={handleChange} checked={info.gender === "F"} />여</label>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <input type='text' ref={phoneRef} value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <th>지역</th>
                        <td>
                            <input type='text' ref={addrRef} value={info.addr} onChange={(e) => setInfo({ ...info, addr: e.target.value })} />
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                id === undefined ? <button type='button' onClick={fnAdd}>등록하기</button> : <button type='button' onClick={fnEdit}>수정하기</button>
            }            
        </>
    );
}

export default Pesrson;