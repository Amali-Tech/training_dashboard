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
        <div id="upload">
            <div>
                <input id="csv" name="csv" type="file" accept=".csv" @change="previewData">
                <div id="count"></div>
            </div>
            <br>
            <div>
                <h5>Data Preview</h5>
                <div id="sample"></div>
                <div></div><br>
                <button id="upload" class="btn btn-light btn-outline-primary btn-md" @click="uploadData">Upload</button>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import Papa from 'papaparse';
    import router from '../router/route';

    export default {
        data() {
            return {
                email: "",
                password: "",
                myData : [],
            };
        },
        methods: {
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
            previewData(event) {
                let prevData = [];
                const csvInput = event.target;
                const file = csvInput.files[0];
                Papa.parse(file, {
                    skipEmptyLines: true,
                    complete: (results) => {
                        prevData = results.data;
                        const count = results.data.length - 1;
                        const text = count + " records detected";
                        const showEl = document.getElementById('sample');
                        const countEl = document.getElementById('count');
                        countEl.textContent = text;
                        for(var i=0; i<3; i++){
                            const divEl = document.createElement('span');
                            divEl.textContent = results.data[i];
                            showEl.append(divEl);

                            const linebreak = document.createElement('br');
                            showEl.append(linebreak);
                        }
                        const newArray = prevData.slice(1);
                        const dataObjects = newArray.map(([email, name, specialization, mentor, entry_month, entry_year, expected_completion_date, regularity_score, responsiveness_score, reliability_score, punctuality_score, course_completion, assessments_completed, assessments_score, projects_submitted, projects_score, capstone_project_score, gca_score]) => ({ email, name, specialization, mentor, entry_month, entry_year, expected_completion_date, regularity_score, responsiveness_score, reliability_score, punctuality_score, course_completion, assessments_completed, assessments_score, projects_submitted, projects_score, capstone_project_score, gca_score }));
                        const stored = localStorage.getItem("token");
                        const retrieved = JSON.parse(stored);
                        const token = `Bearer ${retrieved.token}`;
                        console.log(dataObjects);                                    
                        
                        (async function() {
                            const res = await fetch('http://localhost:5000/upload/', {
                                method: 'POST',
                                headers: {
                                    'Authorization': token,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(dataObjects),
                            })

                            // console.log(res.json);

                            const results = await res.json();
                            localStorage.setItem("uload", JSON.stringify(results));
                            console.log(results);
                        })();
                    }
                });
            },
            uploadData() {
                const results = localStorage.getItem("uload");

                if( results === null) {
                    alert("Please select a csv file");
                }
                else {
                    const retrieved = JSON.parse(results);
                    alert(retrieved.message);
                }
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

    p {
        text-align: center;
        margin-top: 20px
    }
</style>