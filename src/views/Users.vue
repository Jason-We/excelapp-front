<template>
   <v-container>
      <v-row>
         <v-col cols="3" v-for="(user,index) in users" :key="index">
            <v-card>
               <div v-for="(val, name, index) in user" :key="index">
                  <v-card-text>{{name}} : {{val}}</v-card-text>
               </div>
               <v-btn depressed small color="error" class="my-2" @click="deleteOne(user.name)">
                  Delete
               </v-btn>
            </v-card>
         </v-col>
      </v-row>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
         <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

         <v-text-field v-model="sex" :rules="[v => !!v || 'Sex is required']" label="Sex" required></v-text-field>

         <v-text-field v-model="phone" :rules="[v => !!v || 'phone is required']" label="Phone" required></v-text-field>

         <v-text-field v-model="others" :rules="[v => !!v || 'others is required']" label="Others" required>
         </v-text-field>

         <v-btn color="primary" class="mr-4" @click="reset">
            Reset Form
         </v-btn>
         <v-btn color="success" class="mr-4" @click="addUser">
            Submit
         </v-btn>
      </v-form>
   </v-container>

</template>

<script>
   export default {
      name: "Users",
      data() {
         return {
            valid: true,
            lazy: false,
            users: {},
            name: "",
            nameRules: [
               v => !!v || 'Name is required',
               v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            sex: "",
            phone: "",
            others: ""
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
         addUser() {
            const that = this;
            this.axios.post('http://localhost:8088/user/add', {
               name: this.name,
               sex: this.sex,
               phone: this.phone,
               others: this.others
            })
               .then(function (response) {
                  if (response.data === 1) {
                     alert("添加用户成功");
                     that.$refs.form.reset();
                     that.getAllusers();
                  } else {
                     alert("添加用户失败！");
                  }

               })
               .catch(function (error) {
                  console.log(error);
               });

         },
         reset() {
            this.$refs.form.reset()
         },
         getAllusers() {
            const that = this;
            this.axios.get('http://localhost:8088/user/getAll/').then(function (res) {
               console.log(res.data);
               that.users = res.data;
            })
         },
         deleteOne(u) {
            const that = this;
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
   }
</script>
<style scoped>
</style>