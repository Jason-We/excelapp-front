<template>
   <v-app>
      <v-row>
         <v-col class="col-user" cols="3" v-for="(user,index) in users" :key="index">
            <v-card class="card-user">
               <div v-for="(val, name, index) in user" :key="index">
                  <v-card-text>{{name}} : {{val}}</v-card-text>
               </div>
               <v-btn depressed small color="error" class="my-2" @click="deleteOne(user.name)">
                  Delete
               </v-btn>
            </v-card>
         </v-col>
      </v-row>
   </v-app>
</template>

<script>
   export default {
      name: "UserShow",
      data() {
         return {
            users: {},

         }
      },
      created() {
         const that = this;
         this.axios.get('http://localhost:8088/user/getAll/').then(function (res) {
            console.log(res.data);
            that.users = res.data;
         })
      },
      methods: {
         deleteOne(u) {
            const that = this;
            if (confirm("You really want to delete this one？")) {
               this.axios.delete('http://localhost:8088/user/del', {
                  params: {
                     name: u
                  }
               }).then(function (response) {
                  if (response.data === 1) {
                     alert("删除用户成功");
                     that.getAllusers();
                  } else {
                     alert("删除用户失败！");
                  }
               }).catch(function (error) {
                  console.log(error);
               })
            }
         },
         getAllusers() {
            const that = this;
            this.axios.get('http://localhost:8088/user/getAll/').then(function (res) {
               console.log(res.data);
               that.users = res.data;
            })
         },
      },
   }
</script>
<style scoped>
   .card-user {
      padding: 10px;
      margin: 5px 5px 0 5px;
   }

   .col-user {
      padding: 5px;
      margin: 10px 0 0 20px;
      max-height: 300px;
      max-width: 350px;
   }
</style>