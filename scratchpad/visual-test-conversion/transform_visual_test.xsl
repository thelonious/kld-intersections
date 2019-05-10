<!--
    @author Kevin Lindsey

    Converts the intersection example SVG from http://www.kevlindev.com/geometry/2D/intersections/index.htm to a format
    that runs using kld-intersections. To convert an example, run the following:

        xlstproc transform_visual_test.xsl sample.svg

    The primary use of this script was to import all of the example SVG into kld-intersections. It's probably not of
    much use outside of that use case
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.1"
                xmlns:svg="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:gui="http://www.kevlindev.com/gui"
                exclude-result-prefixes="svg gui">

    <xsl:output indent="yes" omit-xml-declaration="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="svg:svg"/>
    </xsl:template>

    <xsl:template match="svg:svg">
        <svg xmlns="http://www.w3.org/2000/svg" onload="go(evt)">
            <script type="text/javascript" xlink:href="../dist/index-umd.js"/>
            <script type="text/javascript" xlink:href="./show_intersections.js"/>
            <xsl:apply-templates select="svg:defs"/>
            <g id="shapes">
                <xsl:apply-templates select="svg:circle|svg:ellipse|svg:line|svg:path|svg:polygon|svg:polyline|svg:rect[not(@id='background')]"/>
            </g>
            <g id="result"/>
        </svg>
    </xsl:template>

    <xsl:template match="svg:defs">
        <defs>
            <xsl:apply-templates select="*"/>
        </defs>
    </xsl:template>

    <xsl:template match="svg:g">
        <g>
            <xsl:apply-templates select="@id"/>
            <xsl:apply-templates select="*"/>
        </g>
    </xsl:template>

    <!-- shapes -->

    <xsl:template match="svg:circle">
        <xsl:element name="circle">
            <xsl:apply-templates select="@cx"/>
            <xsl:apply-templates select="@cy"/>
            <xsl:apply-templates select="@r"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:ellipse">
        <xsl:element name="ellipse">
            <xsl:apply-templates select="@cx"/>
            <xsl:apply-templates select="@cy"/>
            <xsl:apply-templates select="@rx"/>
            <xsl:apply-templates select="@ry"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:line">
        <xsl:element name="line">
            <xsl:apply-templates select="@x1"/>
            <xsl:apply-templates select="@y1"/>
            <xsl:apply-templates select="@x2"/>
            <xsl:apply-templates select="@y2"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:path">
        <xsl:element name="path">
            <xsl:apply-templates select="@d"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:polygon">
        <xsl:element name="polygon">
            <xsl:apply-templates select="@points"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:polyline">
        <xsl:element name="polyline">
            <xsl:apply-templates select="@points"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="svg:rect">
        <xsl:element name="rect">
            <xsl:apply-templates select="@x"/>
            <xsl:apply-templates select="@y"/>
            <xsl:apply-templates select="@width"/>
            <xsl:apply-templates select="@height"/>
            <xsl:apply-templates select="@fill"/>
            <xsl:apply-templates select="@stroke"/>
            <xsl:apply-templates select="@stroke-width"/>
            <xsl:apply-templates select="@opacity"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="@*">
        <xsl:copy/>
    </xsl:template>

    <xsl:template match="text()"></xsl:template>

</xsl:stylesheet>
