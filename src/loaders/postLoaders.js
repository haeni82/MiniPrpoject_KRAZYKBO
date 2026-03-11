import { getAllPost, getPostInfo } from "@/api/postApi";
//useLoaderData 사용하기 위해

// BoardPage Loader
// router에서 호출됨
export const BoardPageLoader = async ({ request }) => {
  //URL에서 쿼리 파라미터 읽기
  const url = new URL(request.url); //request.utl이란 현재 유저가 방문한 URL, 리액트 라우터는 자동으로 /shop?_page=2&category=new&_sort=price 이런 URL을 request 객체에 넣어줌
  const page = url.searchParams.get("_page") || 1;
  const per_page = url.searchParams.get("_per_page") || 12;
  const category = url.searchParams.get("category") || "";
  const sort = url.searchParams.get("_sort") || "";

  // axios params 객체 생성
  const params = {};

  // 카테고리 필터 추가
  if (category) {
    params.category = category;
  }

  // 정렬 옵션 추가
  if (sort) {
    params._sort = sort;
  }

  try {
    const allPosts = await getAllPost(params);
    const postsArray = Array.isArray(allPosts) ? allPosts : [];
    // 페이지네이션 처리
    const totalItems = postsArray.length;
    const totalPages = Math.ceil(totalItems / per_page);
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginationData = postsArray.slice(startIndex, endIndex);

    // json-server 형식에 맞춰 반환
    const posts = {
      data: paginationData,
      total: totalItems,
      pages: totalPages,
      first: page === 1 ? null : 1,
      last: totalPages,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
    };

    console.log(posts)

    return { posts, per_page };
  } catch (err) {
    console.log("err--- BoardPageLoader.js", err);
    throw new Response("게시글 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};


// DetailPage Loader
export const detailPageLoader = async ({ params }) => {
  try {
    // 게시글  ID로 상세 정보 가져오기
    // db의 id가 숫자이므로 문자열로 넘겨주면 안됨
    const post = await getPostInfo(Number(params.postId));

    console.log(post)
    if (!post) {
      throw new Response("게시글이 존재하지 않습니다.", {
        status: 404,
      });
    }
    return post;
  } catch (err) {
    console.log("err---- productsLoader.js", err);
    throw new Response("상품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};