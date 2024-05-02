<template>
    <div class ='Layout'>
        <div class="meau">
            <Meau :isCollapse="isCollapse"></Meau>
        </div>
        <div class="content" :class="{activate:isCollapse}">
            <Content @chageMenu="chageMenu" :isCollapse="isCollapse"></Content>
        </div>
    </div>
</template>

<script>

import Meau from './Meau'
import Content from './Content'
export default{
    data(){
        return{
            isCollapse: false
        }
    },
    components:{
        Meau,
        Content
    },
    methods:{
        chageMenu(){
            this.isCollapse=!this.isCollapse;
        }
    },
}
</script>

<style>
.Layout{
    .meau{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        /* width:  250px; */
        background: #545c64;
        
        /deep/ .el-menu{
            border-right: none;
        }
    } 
    .content{
        padding-left: 250px;
        transition: all 0.45s;
    }
    .activate{
        padding-left: 64px;
    }
}

</style>