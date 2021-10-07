<template>
    <div id="users" class="container">
        <h3 class="d-flex justify-content-center">
            AmaliTech
        </h3>
        <h5 class="d-flex justify-content-center">
            Training Dashboard
        </h5>

        <nav class="navbar navbar-expand-sm gb-light navbar-light">
            <ul class="navbar-nav">
                <!-- <li class="nav-item m-1">
                    <router-link class="btn btn-light btn-outline-primary btn-md" to="/admin">Users</router-link>
                </li>
                <li class="nav-item m-1">
                    <router-link class="btn btn-light btn-outline-primary btn-md" to="/upload">Upload</router-link>
                </li> -->
                <li class="nav-item m-1">
                    <button class="btn btn-light btn-outline-primary btn-md" v-on:click="people">Users</button>
                </li>
                <li class="nav-item m-1">
                    <button class="btn btn-light btn-outline-primary btn-md" v-on:click="upload">Upload</button>
                </li>
                <li class="nav-item m-1">
                    <button class="btn btn-light btn-outline-danger btn-md" v-on:click="logOut">Log Out</button>
                </li>
            </ul>
        </nav>
        <hr>
        <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" 
        data-bs-target="#exampleModal" @click="addClick()">
            Add User    
        </button>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        <div class="d-flex flex-row">
                            <input class="form-control m-2" v-model="emailFilter" v-on:keyup="filter" placeholder="Email Filter">
                        </div>
                        Email
                    </th>
                    <th>
                        <div class="d-flex flex-row">
                            <input class="form-control m-2" v-model="nameFilter" v-on:keyup="filter" placeholder="Name Filter">
                        </div>
                        Name
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Role
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="user in users" :key="user.email">
                        <td>{{(user.email)}}</td>
                        <td>{{user.name}}</td>
                        <td>{{(user.isactive) ? "Active" : "Inactive"}}</td>
                        <td>{{(user.isadmin) ? "Admin" : "Trainee"}}</td>
                        <td>
                            <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" 
                            data-bs-target="#exampleModal" @click="editClick(user)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" 
                            data-bs-target="#exampleModal" @click="resetClick(user)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-light mr-1" @click="deleteUser(user)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
        </table>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" arai-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="add">
                            <div class="form-floating mb-3">
                                <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Email address</label>
                                <span v-if="msg.email" :style="errorColor">{{msg.email}}</span>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="name" type="email" class="form-control" id="floatingInput2" placeholder="Name">
                                <label for="floatingInput">Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Password</label>
                                <span v-if="msg.password" :style="errorColor">{{msg.password}}</span>
                            </div>

                            <div class="form-control form-control-check">
                                <label class="checkbox-inline">
                                    <input type="checkbox" v-model="isActive" />Active
                                </label>
                                
                                <label class="checkbox-inline">
                                    <input type="checkbox" v-model="isAdmin" />Admin
                                </label>
                            </div>
                        </div>
                        <div v-if="edit">
                            <div class="form-floating mb-3">
                                <input v-model="name" type="email" class="form-control" id="floatingInput3" placeholder="Name">
                                <label for="floatingInput">Name</label>
                            </div>
                            <div class="form-control form-control-check">
                                <label class="checkbox-inline">
                                    <input type="checkbox" v-model="isActive" />Active
                                </label>
                                
                                <label class="checkbox-inline">
                                    <input type="checkbox" v-model="isAdmin" />Admin
                                </label>
                            </div>
                        </div>
                        <div v-if="reset">
                            <div class="form-floating mb-3">
                                <input v-model="password" type="password" class="form-control" id="floatingPassword1" placeholder="Password">
                                <label for="floatingPassword">New Password</label>
                                <span v-if="msg.password" :style="errorColor">{{msg.password}}</span>
                            </div>
                        </div>
                        <br>                        
                        <div>
                            <button v-if="add" type="button" class="btn btn-primary" @click="addUser">
                            Create
                            </button>

                            <button v-if="edit" type="button" class="btn btn-primary" @click="editUser">
                                Update
                            </button>

                            <button v-if="reset" type="button" class="btn btn-primary" @click="resetPassword()">
                                Reset
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
import router from '../router/route';
import apiUrl from '../api';

export default {
    name: 'Trainee',
    computed: {
        isActive: {
            set(active) {
                this.active = (active) ? 1: 0;
            },
            get() {
                return this.active;
            }
        },
        isAdmin: {
            set(admin) {
                this.admin = (admin) ? 1: 0;
            },
            get() {
                return this.admin;
            }
        }
    },
    data() {
        return {
            adminEmail: "",
            users: [],
            modalTitle: "",
            name: "",
            email: "",
            password: "",
            active: 0,
            admin: 0,
            add: true,
            edit: true,
            reset: true,
            emailFilter: "",
            nameFilter: "",
            usersWithoutFilter: [],
            msg: [],
            errorColor: {
                color: "red"
            }
        }
    },
    created() {
        const stored = localStorage.getItem("token");
        const retrieved = JSON.parse(stored);
        this.adminEmail = retrieved.email;
        this.getUsers();
    },
    watch: {
        email(value){
            this.email = value;
            this.validateEmail(value);
        },
        password(value){
            this.password = value;
            this.validatePassword(value);
        }
    },
    methods: {
        validateEmail(value){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
                this.msg['email'] = '';
            }
            else{
                this.msg['email'] = 'Invalid email address';
            }
        },
        validatePassword(value){
            if(value.length < 8){
                this.msg['password'] = 'Password must be more than 8 characters';
            }
            else{
                this.msg['password'] = '';
            }

        },
        async getUsers() {
            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;
            const res = await fetch(`${apiUrl.apiUrl}users`, {
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                }
            });

            const init = await res.json();

            this.users = init.message;
            this.usersWithoutFilter = this.users;
            console.log(this.users);
        },
        logOut() {
            localStorage.clear();
            router.push("/login")
        },
        people() {
            router.push("/admin")
        },
        upload() {
            router.push("/upload")
        },
        addClick() {
            this.add = true;
            this.edit = false;
            this.reset = false;
            this.modalTitle = "Add User"
        },
        editClick(user) {
            this.edit = true;
            this.add = false;
            this.reset = false;
            this.modalTitle = "Edit User"
            this.name = user.name;
            this.email = user.email;
        },
        resetClick(user) {
            this.reset = true;
            this.add = false;
            this.edit = false;
            this.modalTitle = "Reset Password";
            this.email = user.email;
        },
        async addUser() {
            let { email, name, password, active, admin } = this;

            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;
            
            const res = await fetch(`${apiUrl.apiUrl}users`, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ email, name, password, active, admin })
            });

            const resp = await res.json();

            alert(resp.message);

            this.email = "";
            this.name = "";
            this.password = "";
            this.active = 0;
            this.admin = 0;

            this.getUsers();
        },
        async editUser() {
            const userEmail = this.email;
            const userName = this.name;
            const userActive = this.active;
            const userAdmin = this.admin;

            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;

            const res = await fetch(`${apiUrl.apiUrl}users/${userEmail}`, {
                method: "PUT",
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ userName, userActive, userAdmin })
            });

            const resp = await res.json();

            alert(resp.message);
            this.getUsers();
        },
        async resetPassword() {
            const newPassword = this.password;
            const userEmail = this.email;

            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;
            
            const res = await fetch(`${apiUrl.apiUrl}users/reset/${userEmail}`, {
                method: "PUT",
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ newPassword })
            });

            const resp = await res.json();

            alert(resp.message);
            this.getUsers();
        },
        async deleteUser(user) {
            // console.log(email);
            if(!confirm(`Are you sure you want to delete ${user.name}?`)) {
                return;
            }
            
            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;
            const res = await fetch(`${apiUrl.apiUrl}users/${user.email}`, {
                method: "DELETE",
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                },
            });

            const resp = await res.json();

            alert(resp.message);
            this.getUsers();
        },
        filter() {
            var emailFilter = this.emailFilter;
            var nameFilter = this.nameFilter;

            this.users = this.usersWithoutFilter.filter(function(el) {
                return el.email.toString().toLowerCase().includes(
                    emailFilter.toString().trim().toLowerCase()
                ) && 
                el.name.toString().toLowerCase().includes(
                    nameFilter.toString().trim().toLowerCase()
                );
            });
        }
    }
}
</script>

<style scoped>
    .checkbox-inline {
        margin-right: 50px;
    }

    .modal-dialog {
        width: 450px;
    }
</style>