const express = require('express')
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req, res) => {
        const query = 'SELECT * FROM TBL_PERSON';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('피드 조회 실패:', err);
                return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
            }
            return res.json({ success: true, list: results });
        });
    })
    .post((req, res) => {
      const { name, gender, phone, addr } = req.body;
      const query = `INSERT INTO TBL_PERSON(NAME, GENDER, PHONE, ADDR) VALUES(?, ?, ?, ?)`;
      connection.query(query, [name, gender, phone, addr], err => {
        if(err) {
          console.error("에러 발생", err);
          return res.json({ success: false, message: '등록 실패'});
        }
        return res.json({ success: true, message: '등록 완료' });
      });      
    });

router.route("/:id")
    .get((req, res) => {
      const id = req.params.id;
      const query = `SELECT * FROM TBL_PERSON WHERE id = ${id}`;
      connection.query(query, (err, results) => {
          if (err) {
              console.error('피드 조회 실패:', err);
              return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
          }
          return res.json({ success: true, list: results });
      });
    })
    .delete((req, res) => {
      const id = req.params.id;
      const query = `DELETE FROM TBL_PERSON WHERE id = ?`;
      connection.query(query, [id], (err) => {
        if(err) {
          console.error('삭제 실패', err);
          return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
        }
        return res.json({ success: true, message: '삭제 성공했습니다.' });
      })  
          
    })
    .put((req, res) => {
      const { name, gender, phone, addr } = req.body;
      const id = req.params.id;
      const query = `UPDATE TBL_PERSON SET name = ?, gender = ?, phone = ?, addr = ? WHERE id = ${id}`;
      connection.query(query, [name, gender, phone, addr] , (err) => {
        if(err) {
          console.error('수정 실패', err);
          return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
        } else {
          return res.json({ success: true, message: '수정 되었습니다.' });
        }
      });
    });
  
module.exports = router;