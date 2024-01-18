const app = Vue.createApp({ //Composition API
  data() {
    //この中で定義した変数をhtmlでも使える
    return {
      users: [],
      sort_key: "",
      sort_asc: true,
      search_key: "",
      inputValue: "",
      selectValue: "",
    };
  },
  methods: {
    sortBy(key) {//クリックされたときに昇順降順の切り替え
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
    filterBy(key) {//selectValueの判定
      this.search_key = key;
    },
    search() {
    }
  },
  computed: {
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
    search_users() {
      if(this.search_key !=""){
      let usersList = []; //検索にヒットしたデータを格納する配列を用意
      for(let i in this.users) {  //this.usersListはdataで定義しているデータをforで順番に回していきます
        let user = this.users[i];  //回されてきたデータを変数userに格納
        //indexOfでuserデータとinputValue(ユーザーが入力した文字)が一致するか判断
        if(this.search_key == 'id' && user.id == this.inputValue) {
          usersList.push(user);
        }
          if(this.search_key == 'name' && user.name.indexOf(this.inputValue) !== -1){
          usersList.push(user);
        }
          if(this.search_key == 'company' && user.company.indexOf(this.inputValue) !== -1){
          usersList.push(user);
        }
          if(this.search_key == 'division' && user.division.indexOf(this.inputValue) !== -1){
          usersList.push(user);
        }
          if(this.search_key == 'title' && user.title.indexOf(this.inputValue) !== -1){
          usersList.push(user);
        }
      }
      return usersList;  //usersListを返します
      } else{
        return this.users;
      }
    },
  },
  mounted() {
    axios
      .get("./cards.json")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));
  },
});
app.mount("#app");
