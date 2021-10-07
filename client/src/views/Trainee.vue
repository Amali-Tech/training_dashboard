<template>
    <div class="container">
        <h3 class="d-flex justify-content-center">
            AmaliTech
        </h3>
        <h5 class="d-flex justify-content-center">
            Training Dashboard
        </h5>

        <nav class="navbar navbar-expand-sm gb-light navbar-light">
            <ul class="navbar-nav">
                <button class="btn btn-light btn-outline-danger btn-md" v-on:click="logOut">Log Out</button>
            </ul>
        </nav>
        <hr>
        <div class="home-content">
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Specialization</div>
                    <div class="number">{{marks.message.specialization}}</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Mentor</div>
                    <div class="number">{{marks.message.mentor}}</div>
                </div>
            </div>
        </div>
        <div class="marks-content">
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Responsiveness Score</div>
                    <div class="number">{{marks.message.responsive_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Capstone Project Score</div>
                    <div class="number">{{marks.message.capstone_project_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">GCA Score</div>
                    <div class="number">{{marks.message.gca_score}}</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">GCA Score Level</div>
                    <div class="number">{{range}}</div>
                </div>
            </div>
        </div>
        <div class="marks-content-1">
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Regularity Score</div>
                    <div class="number">{{marks.message.regularity_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Projects Submitted</div>
                    <div class="number">{{marks.message.projects_submitted}}</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Average Project Score</div>
                    <div class="number">{{marks.message.projects_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div id="hidebox">
                    <div id = "hidebox"></div>
                    <div id = "hidebox"></div>
                </div>
            </div>
        </div>
        <div class="marks-content-2">
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Punctuality Score</div>
                    <div class="number">{{marks.message.punctuality_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Completed Assessments</div>
                    <div class="number">{{marks.message.assessments_completed}}</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Graded Projects</div>
                    <div class="number">{{marks.message.projects_submitted}}</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div id="hidebox">
                    <div id = "hidebox"></div>
                    <div id = "hidebox"></div>
                </div>
            </div>
        </div>
        <div class="marks-content-3">
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Reliability Score</div>
                    <div class="number">{{marks.message.reliability_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Assessment Score</div>
                    <div class="number">{{marks.message.assessments_score}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div class="box">
                    <div class="box-topic">Certification Completion</div>
                    <div class="number">{{marks.message.course_completion}}%</div>
                </div>
            </div>
            <div class="overview-boxes">
                <div id="hidebox">
                    <div id = "hidebox"></div>
                    <div id = "hidebox"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router/route';
import apiUrl from '../api';
export default {
    name: 'Trainee',
    data() {
        return {
            email: "",
            showResults: false,
            marks: {},
            range: ""
        }
    },
    created() {
        const stored = localStorage.getItem("token");
        const retrieved = JSON.parse(stored);
        this.email = retrieved.email;
        this.getMarks();
    },
    methods: {
        async getMarks() {
            const stored = localStorage.getItem("token");
            const retrieved = JSON.parse(stored);
            const token = `Bearer ${retrieved.token}`;
            const res = await fetch(`${apiUrl.apiUrl}trainee/${this.email}`, {
                headers: {
                    'Authorization': token,
                    'Content-type': "application/json"
                }
            });

            this.marks = await res.json();
            this.getRange(this.marks.message.gca_score);
            console.log(this.marks.message.specialization);         
            // this.showResults = !this.showResults;
        },
        getRange(gca) {
            if(300 < gca && gca < 399) {
                this.range = "Level 1 {300-399}";
                return;
            }
            else if(400 < gca && gca < 499) {
                this.range = "Level 2 {400-499}";
                return;
            }
            else if(500 < gca && gca < 599) {
                this.range = "Level 3 {500-599}";
                return;
            }
            else if(600 < gca && gca < 649) {
                this.range = "Level 4 {600-649}";
                return;
            }
            else if(650 < gca && gca < 699) {
                this.range = "Level 5 {650-699}";
                return;
            }
            else if(700 < gca && gca < 749) {
                this.range = "Level 6 {700-749}";
                return;
            }
            else if(750 < gca && gca < 774) {
                this.range = "Level 7 {750-774}";
                return;
            }
            else if(775 < gca && gca < 799) {
                this.range = "Level 8 {775-799}";
                return;
            }
            else if(800 < gca && gca < 824) {
                this.range = "Level 9 {800-824}";
                return;
            }
            else if(825 < gca && gca < 850) {
                this.range = "Level 10 {825-850}";
                return;
            }
        },
        logOut() {
            localStorage.clear();
            router.push("/login")
        }
    }
}
</script>

<style scoped>
    .home-content {
        position: relative;
        /* padding-top: 50px; */
        display: flex;
    }

    .home-content .overview-boxes{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .home-content .overview-boxes .box{
        width: calc(100% / 2 - 15px);
        /* display: flex; */
        align-items: center;
        padding: 15px 14px;
        background: rgb(238, 232, 232);
        border-radius: 12px;
    }

    .home-content .overview-boxes .box-topic{
        font-size: 15px;
        font-weight: 400;
    }

    .home-content .overview-boxes .number{
        font-size: 25px;
        font-weight: 400;
        margin-top: -5px;
        display: inline-block;
    }

    .marks-content {
        position: relative;
        padding-top: 20px;
        display: flex;
    }

    .marks-content .overview-boxes{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .marks-content .overview-boxes .box{
        width: calc(100% - 15px);
        /* display: flex; */
        align-items: center;
        padding: 15px 14px;
        background: rgb(238, 232, 232);
        border-radius: 12px;
    }

    .marks-content .overview-boxes .box-topic{
        font-size: 15px;
        font-weight: 400;
    }

    .marks-content .overview-boxes .number{
        font-size: 25px;
        font-weight: 400;
        margin-top: -5px;
        display: inline-block;
    }

    .marks-content-1 {
        position: relative;
        padding-top: 20px;
        display: flex;
    }

    .marks-content-1 .overview-boxes{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .marks-content-1 .overview-boxes .box{
        width: calc(100% - 15px);
        /* display: flex; */
        align-items: center;
        padding: 15px 14px;
        background: rgb(238, 232, 232);
        border-radius: 12px;
    }

    .marks-content-1 .overview-boxes .box-topic{
        font-size: 15px;
        font-weight: 400;
    }

    .marks-content-1 .overview-boxes .number{
        font-size: 25px;
        font-weight: 400;
        margin-top: -5px;
        display: inline-block;
    }

    .marks-content-2 {
        position: relative;
        padding-top: 20px;
        display: flex;
    }

    .marks-content-2 .overview-boxes{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .marks-content-2 .overview-boxes .box{
        width: calc(100% - 15px);
        /* display: flex; */
        align-items: center;
        padding: 15px 14px;
        background: rgb(238, 232, 232);
        border-radius: 12px;
    }

    .marks-content-2 .overview-boxes .box-topic{
        font-size: 15px;
        font-weight: 400;
    }

    .marks-content-2 .overview-boxes .number{
        font-size: 25px;
        font-weight: 400;
        margin-top: -5px;
        display: inline-block;
    }

    .marks-content-3 {
        position: relative;
        padding-top: 20px;
        display: flex;
    }

    .marks-content-3 .overview-boxes{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .marks-content-3 .overview-boxes .box{
        width: calc(100% - 15px);
        /* display: flex; */
        align-items: center;
        padding: 15px 14px;
        background: rgb(238, 232, 232);
        border-radius: 12px;
    }

    .marks-content-3 .overview-boxes .box-topic{
        font-size: 15px;
        font-weight: 400;
    }

    .marks-content-3 .overview-boxes .number{
        font-size: 25px;
        font-weight: 400;
        margin-top: -5px;
        display: inline-block;
    }
    
    #hidebox{
        background-color: white;
    }

</style>