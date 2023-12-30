package com.renault.utils

import io.gatling.core.Predef._
import io.gatling.core.structure.ChainBuilder

object UserFeeder {
  def get(): ChainBuilder =
     feed((1 to 1000000).toStream.map(i => Map("USER_ID" -> i.toString)).toIterator) // 1M users per scenario should be enough
}
