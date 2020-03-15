<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputVal" @change="handleInput" />
    <a-button @click="addItem" type="primary">添加事项</a-button>
    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox @change="(e) => {cbStatusChanged(e,item.id)}" :checked="item.done">{{item.info}}</a-checkbox>
        <a @click="deleteItem(item.id)">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>{{unDoneLenght}}条剩余</span>
        <a-button-group>
          <a-button @click="changeList('all')" :type="viewKey === 'all' ? 'primary':'default'">全部</a-button>
          <a-button @click="changeList('undone')" :type="viewKey === 'undone' ? 'primary':'default'">未完成</a-button>
          <a-button @click="changeList('done')" :type="viewKey === 'done' ? 'primary':'default'">已完成</a-button>
        </a-button-group>
        <a @click="clear">清除完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputVal', 'viewKey']),
    ...mapGetters(['unDoneLenght', 'infoList'])
  },
  methods: {
    handleInput (e) {
      console.log(e.target.value)
      this.$store.commit('setInput', e.target.value)
    },
    addItem () {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('addItem')
    },
    deleteItem (id) {
      console.log(id)
      this.$store.commit('deleteItem', id)
    },
    cbStatusChanged (e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('cbStatus', param)
    },
    clear () {
      this.$store.commit('clearDone')
    },
    changeList (key) {
      this.$store.commit('changeList', key)
    }
  }
}
</script>

<style>
#app {
  padding: 10px;
}
.my_ipt {
  width: 30% !important;
  margin-bottom: 10px !important;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
