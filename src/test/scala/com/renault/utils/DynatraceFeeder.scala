package com.renault.utils

import io.gatling.core.Predef._
import io.gatling.core.structure.ChainBuilder

object DynatraceFeeder {
  def get(id: String, name: String): ChainBuilder =
       feed(Iterator.continually(Map("VIRTUAL_USER_ID" -> id)))
      .feed(Iterator.continually(Map("SOURCE_ID" -> "gatling")))
      .feed(Iterator.continually(Map("TEST_STEP_NAME" -> name)))
      .feed(Iterator.continually(Map("LOAD_SCRIPT_NAME" -> name)))
      .feed(Iterator.continually(Map("LOAD_TEST_NAME" -> name)))
}
