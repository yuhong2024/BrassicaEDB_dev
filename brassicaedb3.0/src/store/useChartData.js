import { defineStore } from 'pinia'

export const useChartData = defineStore('chartData', {
    state: () => ({
        pieData: null,
        barData1: null,
        barData2: null,
    }),
    actions: {
        loadChartData() {
            const jsonData = {
                pieData: [
                    { value: 40, name: 'A' },
                    { value: 30, name: 'B' },
                    { value: 30, name: 'C' }
                ],
                barData1: {
                    labels: ['Jan', 'Feb', 'Mar'],
                    values: [40, 20, 30]
                },
                barData2: {
                    labels: ['Apr', 'May', 'Jun'],
                    values: [50, 25, 40]
                }
            }

            this.pieData = jsonData.pieData
            this.barData1 = jsonData.barData1
            this.barData2 = jsonData.barData2
        }
    }
})
