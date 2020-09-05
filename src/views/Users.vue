<template>
   <div class="users">
      <ul v-for="(user,index) in users" :key="index">
         <li>{{user.name}}</li>
         <li>{{user.sex}}</li>
         <li>{{user.phone}}</li>
         <li>{{user.others}}</li>
      </ul>
   </div>
</template>

<script>
   export default {
      name: "Users",
      data() {
         return {
            users: {}
         }
      },
      created() {
         const that = this;
         axios.get('http://localhost:8088/user/getAll/').then(function (res) {
            console.log(res.data);
            that.users = res.data;
         })
      },
   }
</script>
<style scoped>
   li {
      list-style-type: none;
   }
</style>