<template>
   <div class="users">
      <div class="show-user">
         <ul v-for="(user,index) in users" :key="index">
            <li>{{user.name}}</li>
            <li>{{user.sex}}</li>
            <li>{{user.phone}}</li>
            <li>{{user.others}}</li>
         </ul>
      </div>
      <div class="add-user">
         <p>添加用户</p>
         <p>姓名：<input v-model="name" /></p>
         <p>性别：<input v-model="sex" /></p>
         <p>手机：<input v-model="phone" /></p>
         <p>其他：<input v-model="others" /></p>
         <button @click="addUser">提交</button>
      </div>
   </div>
</template>

<script>
   export default {
      name: "Users",
      data() {
         return {
            users: {},
            name: "",
            sex: "",
            phone: "",
            others: ""
         }
      },
      created() {
         const that = this;
         axios.get('http://localhost:8088/user/getAll/').then(function (res) {
            console.log(res.data);
            that.users = res.data;
         })
      },
      methods: {
         addUser() {
            axios.post('http://localhost:8088/user/add', {
               name: this.name,
               sex: this.sex,
               phone: this.phone,
               others: this.others
            })
               .then(function (response) {
                  alert(response.data);
               })
               .catch(function (error) {
                  console.log(error);
               });
         }
      },
   }
</script>
<style scoped>
   li {
      list-style-type: none;
   }
</style>