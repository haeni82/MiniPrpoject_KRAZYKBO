import axios from "axios";

// 인기 게시글 정보 가져오기
// MainPage에서 사용
export const getTopPost = async () => {
  try {
    const res = await axios.get(`/api/topPosts`);
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.log("postApi.js : getTopPost -err", err);
    return null;
  }
};

// 모든 게시글 가져오기
// BoardPage에서 사용
// Loader에서 불러올 것
export const getAllPost = async (params = {}) => {
  try {
    const res = await axios.get(`/api/posts/`, { params });
    // json.server 응답이 배열인 경우와 객체인 경우 모두 처리
    if (Array.isArray(res.data)) {
      return res.data; // 배열인 경우 그대로 반환 (MainPage용)
    }
    // 페이지네이션된 경우 객체 반환
    return res.data;
  } catch (err) {
    console.log("postApi.js : getTopPost -err", err);
    return null;
  }
};


// 특정 게시글 가져오기
// 인기 게시글이나 게시글 목룍에서 클릭했을 때 특정 게시글의 정보를 받아온다
export const getPostInfo = async (id) => {
  try {
    // db에 id가 숫자형이라 에러 발생했다.
    const res = await axios.get(`/api/posts`, {
      params: { id: id }  // /api/posts?id=1 형태로 요청
    });
    return res.data[0];
  } catch (err) {
    console.log("productApi.js : getProductsById -err", err);
    return null;
  }
};