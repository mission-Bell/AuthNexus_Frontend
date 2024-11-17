import { sample } from "@/actions/sample";
const ServerActionsSamplePage = () => {
  return (
    <div>
      <h1>Server Actions Sample Page</h1>
      {/* buttonのイベントハンドラとして使用することも可能。ただし、その場合は、client componentにする必要がある */}
      <div>{/* <button onClick={() => sample()}>clicke!</button> */}</div>
      {/* formの場合、server componentのままでもいける。イベントリスナーへの登録などが不要なため（リンクに近い）ためと思われる */}
      <form action={sample}>
        <input type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default ServerActionsSamplePage;
