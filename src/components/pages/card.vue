<template>
    <div id="card">
        <div class="card_query_form">
            <ul class="list-inline tab">
                <li @click="changeTab('card')" :class="type == 'card' ? 'active' : ''">
                    <div>卖座卡</div>
                </li>
                <li @click="changeTab('ecard')" :class="type == 'ecard' ? 'active' : ''">
                    <div>电子卖座卡</div>
                </li>
            </ul>
            <div class="material" v-if="type == 'card'">
                <div>
                    <label>卡号:</label>
                    <input type="text" placeholder="请输入卡号" />
                    <div class="line"></div>
                </div>
                <div>
                    <label>密码:</label>
                    <input type="text" placeholder="请输入密码" />
                    <div class="line"></div>
                </div>
            </div>
            <div class="material" v-if="type == 'ecard'">
                <div>
                    <label>卡号:</label>
                    <input type="text" placeholder="请输入15位电子卖座卡" />
                    <div class="line"></div>
                </div>
            </div>
            <button class="card_query_bottom center-block">查询</button>
        </div>
    </div>
</template>

<script>
    import '../../assets/card.css'
    export default {
        data() {
            return {
                type: 'card'
            }
        },
        created() {
            this.$store.dispatch('changeTitle', "查询/绑定/激活卖座卡");            
        },
        methods: {
            changeTab(type) {
                this.type = type;
            }    
        }
    }
</script>

