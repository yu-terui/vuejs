const app = Vue.createApp({
  data() {//この中で定義した変数をhtmlでも使える
    return {
      users: [],
      sort_key: "",
      sort_asc: true,
    }
  },
  methods: {
    sortBy(key) {//クリックされたときに昇順降順の切り替え
      this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true);
      this.sort_key = key;
    },
  },
  computed: {
    sort_users() {//v-forでもこの値を使用
      if (this.sort_key != "") {//sort_keyが空じゃない場合
        let set = 1;//setという変数を使って戻り値の値を変更
        this.sort_asc ? (set = 1) : (set = -1);
        let collator = new Intl.Collator('ja');
        this.users.sort(collator.compare);
        this.users.sort((a, b) => {
          if (a[this.sort_key] < b[this.sort_key])
            return -1 * set;
          if (a[this.sort_key] > b[this.sort_key])
            return 1 * set;
          return 0;
        });
        return this.users;
      } else {
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
