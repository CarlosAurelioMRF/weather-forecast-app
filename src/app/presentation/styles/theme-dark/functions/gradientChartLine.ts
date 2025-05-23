/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

// Material Dashboard 2 PRO React TS Helper Functions
import rgba from '~/app/presentation/styles/theme/functions/rgba'

function gradientChartLine(chart: any, color: string, opacity: number = 0.2): any {
  const ctx = chart.getContext('2d')
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
  const primaryColor = rgba(color, opacity).toString()

  gradientStroke.addColorStop(1, primaryColor)
  gradientStroke.addColorStop(0.2, 'rgba(72, 72, 176, 0.0)')
  gradientStroke.addColorStop(0, 'rgba(203, 12, 159, 0)')

  return gradientStroke
}

export default gradientChartLine
