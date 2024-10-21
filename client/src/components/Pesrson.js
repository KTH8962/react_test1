import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pesrson(props) {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    async function fnList() {
        try {
            const res = await axios.get(`http://localhost:3100/person`);
            //console.log(res);
            if(res.data.success) {
                setList(res.data.list);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fnDelete(id){
        if(!window.confirm('삭제하시겠습니까?')) return;
        try {
            const res = await axios.delete(`http://localhost:3100/person/${id}`);
            alert(res.data.message);
            if(res.data.success) {
                fnList();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function fnAdd(id){
        if(id == undefined){
            navigate(`/insert`);
        } else {
            navigate(`/insert/${id}`);
        }
    }


    useEffect(() => {
        fnList();
    }, []);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>전화번호</th>
                        <th>지역</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.gender}</td>
                            <td>{item.phone}</td>
                            <td>{item.addr}</td>
                            <td>
                                <button type='button' onClick={()=>{fnAdd(item.id);}}>수정</button>
                            </td>
                            <td>
                                <button type='button' onClick={()=>{fnDelete(item.id);}}>삭제</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button type='button' onClick={()=>{fnAdd()}}>등록하기</button>
        </>
    );
}

export default Pesrson;