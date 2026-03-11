import axios from "axios";

// 팀 정보 가져오기
// 구단의 id, 이름, 로고, 색상과 같은 정보가 들어있음
export const getTeamInfo = async (id) => {
    try{
        const res = await axios.get(`/api/teams/${id}`)
        return res.data
    } catch (err) {
    console.log("teamApi.js : getTeamInfo -err", err);
    return null;
  }
}

// 모든 팀 정보 가져오기
export const getAllTeam = async () => {
    try{
        const res = await axios.get(`/api/teams`)
        return res.data
    } catch (err) {
    console.log("teamApi.js : getTeamInfo -err", err);
    return null;
  }
}