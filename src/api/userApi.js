import axios from "axios";


// 유저 ID로 team 정보 가져오기
export const getUserTeam = async (id) => {
    try{
        const res = await axios.get(`/api/users/${id}`)
        return res.data.team
    } catch (err) {
    console.log("userApi.js : getUserTeam -err", err);
    return null;
  }
}

// 유저 선택 구단 업데이트
export const updateUserTeam = async (id, team) => {
  try {
    const cartItem = await axios.get(`/api/users/${id}`);
    const updateItem = { ...cartItem.data, team };
    const res = await axios.put(`/api/users/${id}`, updateItem);
    return res.data;
  } catch (err) {
    console.log("err userApi.js", err);
  }
};