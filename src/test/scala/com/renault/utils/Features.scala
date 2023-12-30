package com.renault.utils

import java.nio.file.Paths
import java.util._

import com.intuit.karate.CallContext
import com.intuit.karate.core.{Engine, FeatureParser, Tags}

object Features {

  def getList(path: String): Array[String] =
    Paths
      .get(ClassLoader.getSystemResource(path).toURI())
      .toFile()
      .listFiles()
      .map(_.getName)
      .filter(""".*\.feature""".r.findFirstIn(_).isDefined)
      .map(name => s"classpath:$path/$name")

  def runFeature(path: String, tag: String): Map[String, Object] = {
    val feature = FeatureParser.parse(path)
    val tagSelector = Tags.fromKarateOptionsTags(Arrays.asList(tag))
    val callContext = new CallContext(null, true)
    val result = Engine.executeFeatureSync(null, feature, tagSelector, callContext)
    if (result.isFailed) throw result.getErrorsCombined

    result.getResultAsPrimitiveMap
  }
}
