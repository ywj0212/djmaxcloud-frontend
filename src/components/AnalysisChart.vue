<template>
  <div class="analysis-chart">
    <vue-chart
      class="analysis-chart__content"
      :chartData="chartData"
      :chartOptions="chartOptions"
      :width="null"
      :height="null"
    />
    <div class="analysis-chart__backdrop" v-if="backdrop"></div>
    <div class="analysis-chart__empty-layer" v-if="empty">
      <p>데이터가 없어요</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "data", // 배열, 서버에서 직접 날려준 시계열 데이터가 담김, X축과 Y축에 표시될 정보를 갖고 있음
    "color", // 스트링, 차트의 메인 컬러 정보를 HEX로 표시
    "legend", // 스트링, 차트 범례로 이 값이 바뀔 때마다 `chartOption`을 변경하여 차트 업데이트를 유도해야 함
    "backdrop", // 불리언, true일 때 차트 비활성화를 표현하는 반투명 검은색 레이어를 띄움
    "empty", // 불리언, true일 때 측정된 데이터 없음을 표현하는 투명 레이어를 띄움
    "yAxis", // 스트링, y축 단위 라벨, y축 단위가 횟수 또는 시간(분)일수도 있기 때문
  ],
};
</script>

<script>
export default {
  computed: {
    bars() {
      return this.data.map((item) => {
        return {
          x: item.timestamp, // x축은 시계열 데이터인 유닉스 타임스탬프
          y: item.data ?? 0, // y축은 실제 측정된 값
        };
      });
    },

    chartData() {
      return {
        datasets: [
          {
            data: this.bars, // 위에서 정의한 { x, y } 배열
            barThickness: "flex", // 하나의 x축 영역이 얼마만큼 너비를 가지는지
            barPercentage: 0.5, // 하나의 x축 영역 내에서 실제 막대 그래프가 몇 퍼센트만큼 너비를 가지는지
            backgroundColor: this.color, // 백그라운드 색상
          },
        ],
      };
    },

    chartOptions() {
      return {
        responsive: true, // 반응형
        aspectRatio: 1.19, // 반응형 유지하면서 가로/세로 비율을 고정
        legend: {
          display: false, // 차트 내 범례 디스플레이 비활성화
        },
        scales: {
          xAxes: this.xAxes, // x축 세부 설정, 별도 getter로 분리
          yAxes: this.yAxes, // y축 세부 설정, 별도 getter로 분리
        },
        animation: {
          duration: 0, // 트랜지션 효과 비활성화
        },
      };
    },

    xAxes() {
      return [
        {
          type: "time", // axes 타입을 time으로 설정하여 시계열 데이터 관련 옵션들을 사용할 수 있게 하기
          time: this.currentLegend, // 시계열 관련 데이터, 별도 getter로 분리
          gridLines: {
            borderDash: [4, 6], // 그리드 관련 점선 스타일링
          },
          ticks: this.ticks, // 그리드로 나누어 그려지는 하나의 틱(주기) 관련 설정
        },
      ];
    },

    currentLegend() {
      switch (this.legend) {
        case "d": // 일간
          return {
            unit: "hour", // 각 x축의 시계열 데이터를 어떤 시간 단위 기준으로 나열할 것인지
            round: "minute", // 시계열 데이터를 반올림할 단위
            unitStepSize: 4, // 몇 개만큼의 unit을 하나의 tick으로 계산할 것인지
            displayFormats: {
              hour: "H", // 날짜 포맷 스트링
            },
          };

        case "w": // 주간
          return {
            unit: "day",
            round: "hour",
            unitStepSize: 1,
            displayFormats: {
              day: "dd",
            },
          };

        case "m": // 월간
          return {
            unit: "day",
            round: "hour",
            unitStepSize: 7,
            displayFormats: {
              day: "D",
            },
          };

        default:
          return {};
      }
    },

    ticks() {
      switch (this.legend) {
        case "d": // 일간
          return {
            callback: (tick, index, _array) => {
              // 다음날 0시를 일간 그래프 x축에 나타내기
              // index가 6인 이유는 unitStepSize를 4로 설정하였기 때문에
              // 6번째 오는 인덱스는 항상 다음날 0시를 나타냄
              if (index === 6) {
                return 24;
              }
              return tick;
            },
          };

        case "m": // 월간
          return {
            // 매달 1일은 틱으로 나타내지 않음
            callback: (tick, index, _array) => {
              if (index === 0) {
                return "";
              }
              return `${tick}일`;
            },
          };

        case "w": // 주간
        default:
          return {};
      }
    },

    yAxes() {
        return [
          {
            gridLines: {
              display: false, // y축은 그리드를 선으로 표현하지는 않음
            },
            position: "right", // y축 라벨의 위치
            ticks: {
              // 라벨에 표현되는 y축 그리드는 항상 3등분하기
              stepSize: Math.ceil(
                Math.max(
                  this.bars.reduce((acc, cur) => {
                    return Math.max(acc, Number(cur.y));
                  }, 0) / 3,
                  1
                )
              ),
              suggestedMax: 3, // y축 디폴트 최대값
              beginAtZero: true, // y축 시작을 항상 0부터 시작하게
              callback: (value, _index, _values) => {
                return `${value}${this.yAxis}`;
              },
            },
          },
        ];
      }
  },
};
</script>