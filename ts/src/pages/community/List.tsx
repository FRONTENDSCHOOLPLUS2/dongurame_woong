import Button from "@components/Button";
import Submit from "@components/Submit";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();

  const newInfoNew = () => {
    navigate("/info/new");
  };

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // location.href = "";
          }}
        >
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <Submit>검색</Submit>
        </form>

        <Button
          type="button"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          onClick={newInfoNew}
        >
          글작성
        </Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            <ListItem />
            {/* 본문 출력 */}
            {/* {posts && //처음에 posts를 불러오면 빈배열이기 때문에 에러발생 posts를 먼저 불러오고 posts의 배열들 불러오기
              posts.map((post, index) => {
                index = posts.length - index;
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
                    <td className="p-2 text-center">{index}</td>
                    <td
                      className="p-2 truncate indent-4 cursor-pointer"
                      onClick={() => (location.href = "/info/2")}
                    >
                      {post.title}
                    </td>
                    <td className="p-2 text-center truncate">
                      {post.user.name}
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      {post.views}
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      {post.repliesCount}
                    </td>
                    <td className="p-2 truncate text-center hidden sm:table-cell">
                      {post.createdAt}
                    </td>
                  </tr>
                );
              })} */}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="text-bold text-blue-700">
              <a href="/info?page=1">1</a>
            </li>
            <li>
              <a href="/info?page=2">2</a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default List;
