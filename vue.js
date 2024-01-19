const app = Vue.createApp({
  //Composition API
  data() {
    //この中で定義した変数をhtmlでも使える
    return {
      users: [],
      newUsers: [],
      //ソート
      sort_key: "",
      sort_asc: true,
      //検索
      search_key: "",
      inputValue: "",
      selectValue: "",
      //新規追加
      nameValue: "",
      companyValue: "",
      divisionValue: "",
      titleValue: "",
      message: "英数字記号を含めないでください",
    };
  },
  methods: {
    //ソート機能 項目クリック
    sortBy(key) {
      //クリックされたときに昇順降順の切り替え
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
    //絞り込み機能 セレクトボックスの項目選択
    filterBy(key) {
      //selectValueの判定
      this.search_key = key;
    },
    //絞り込み機能 検索ボタン
    searchBtn() {
      //クリックする度にnewUsersをリセット
      this.newUsers = this.users;
      //１．セレクトボックスの値が選択されているか
      if (this.search_key != "") {
        // this.newUsers.splice(0, this.newUsers.length);
        let usersList = []; //検索にヒットしたデータを格納する配列を用意
        for (let i in this.newUsers) {
          //this.newUsersListはdataで定義しているデータをforで順番に回していきます
          let user = this.newUsers[i]; //回されてきたデータを変数userに格納
          //２．セレクトボックスの値に応じて、検索欄の値と一致するデータがあるかを判定
          if (this.search_key == "id" && user.id == this.inputValue) {
            usersList.push(user);
          }
          if (
            this.search_key == "name" &&
            user.name.indexOf(this.inputValue) !== -1
          ) {
            usersList.push(user);
          }
          if (
            this.search_key == "company" &&
            user.company.indexOf(this.inputValue) !== -1
          ) {
            usersList.push(user);
          }
          if (
            this.search_key == "division" &&
            user.division.indexOf(this.inputValue) !== -1
          ) {
            usersList.push(user);
          }
          if (
            this.search_key == "title" &&
            user.title.indexOf(this.inputValue) !== -1
          ) {
            usersList.push(user);
          }
        }
        //代入
        this.newUsers = usersList;
      } //2回目以降の検索が、絞り込まれたリストの中からの検索になっている＝newUsersの中身がそれだけだから
    },
    //新規追加機能
    createBtn() {
      if (
        (this.nameValue == "") |
        (this.companyValue == "") |
        (this.divisionValue == "") |
        (this.titleValue == "")
      ) {
        alert("すべて必須項目です");
      } else {
        let lastItem = this.newUsers.slice(-1)[0];
        this.newUsers.push(
          ...[{
            id: lastItem.id + 1,
            name: this.nameValue,
            company: this.companyValue,
            division: this.divisionValue,
            title: this.titleValue,
          }]);
      }
    },
  },
  computed: {
    //ソート機能 判定
    sort_users() {
      //v-forでもこの値を使用
      if (this.sort_key != "") {
        //sort_keyが空じゃない場合
        let set = 1; //setという変数を使って戻り値の値を変更
        this.sort_asc ? (set = 1) : (set = -1);
        let collator = new Intl.Collator("ja");
        this.users.sort(collator.compare);
        this.users.sort((a, b) => {
          if (a[this.sort_key] < b[this.sort_key]) return -1 * set;
          if (a[this.sort_key] > b[this.sort_key]) return 1 * set;
          return 0;
        });
        return this.users;
      } else {
        return this.users;
      }
    },
    //新規追加機能 バリデーション
    isInvalidName() {
      return this.nameValue.match(/[a-zA-Z0-9!-/:-@¥[-`{-~]/);
    },
    isInvalidCompany() {
      return this.companyValue.match(/[a-zA-Z0-9!-/:-@¥[-`{-~]/);
    },
    isInvalidDivision() {
      return this.divisionValue.match(/[a-zA-Z0-9!-/:-@¥[-`{-~]/);
    },
    isInvalidTitle() {
      return this.titleValue.match(/[a-zA-Z0-9!-/:-@¥[-`{-~]/);
    },
  },
  mounted() {
    axios
      .get("./cards.json")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));
    axios
      .get("./cards.json")
      .then((res) => (this.newUsers = res.data))
      .catch((error) => console.log(error));
  },
});
app.mount("#app");
