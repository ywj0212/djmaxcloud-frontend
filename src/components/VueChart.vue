<script>
import { Bar, mixins } from "vue-chartjs";
import { locale } from "moment";

export default {
  name: "vue-chart",
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "chartOptions"],

  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },

  created() {
    // 혹시 시계열 데이터 관련해서 언어 설정이 필요하다면,
    // 전역적으로 혹은 컴포넌트 생성 단계에서 할 수 있습니다
    locale("ko");
  },

  watch: {
    chartOptions() {
      // 옵션은 반응형 지원하지 않기 때문에 변경되었을 때 재렌더
      this.renderChart(this.chartData, this.chartOptions);
    },
  },
};
</script>