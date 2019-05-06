/**
 * UI界面
 * @author ydx
 * @date 2019-04-10
 */
// import 'bootstrap/dist/css/bootstrap.min.css';
import './UI.min.css';
import './UI.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';

let UIView = "";
UIView += "<!-- 工具栏 start -->";
UIView += "<div class=\"container\">";
UIView += "        <nav class=\"navbar navbar-fixed-top navbar-default\" role=\"navigation\">";
UIView += "            <div class=\"container-fluid\">";
UIView += "                <!-- Collect the nav links, forms, and other content for toggling -->";
UIView += "                <div class=\"collapse navbar-collapse\" id=\"bs-navbar-collapse\">";
UIView += "                    <ul class=\"nav navbar-nav navbar-right\">";
UIView += "                        <li>";
UIView += "                            <a href=\"#\" class=\"toolbar pan\" id=\"panBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-pan\"><\/span>&nbsp;漫游";
UIView += "                            <\/a>";
UIView += "                        <\/li>";
UIView += "                        <li>";
UIView += "                            <a href=\"#\" class=\"toolbar zoomIn\" id=\"zoomInBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-zoomIn\"><\/span>&nbsp;放大";
UIView += "                            <\/a>";
UIView += "                        <\/li>";
UIView += "                        <li>";
UIView += "                            <a href=\"#\" class=\"toolbar zoomOut\" id=\"zoomOutBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-zoomOut\"><\/span>&nbsp;缩小<\/a>";
UIView += "                        <\/li>";
UIView += "                        <li>";
UIView += "                            <a href=\"#\" class=\"toolbar fullScreen\" id=\"fullScreenBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-fullScreen\"><\/span>&nbsp;全图<\/a>";
UIView += "                        <\/li>";
UIView += "                        <li>";
UIView += "                            <a href=\"#\" class=\"toolbar extent\" id=\"extentBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-extent\"><\/span>&nbsp;拉框选择<\/a>";
UIView += "                        <\/li>";
UIView += "                        <li class=\"dropdown\">";
UIView += "                            <a href=\"#\" class=\"dropdown-toggle toolbar measure\" data-toggle=\"dropdown\" id=\"measureBtn\">";
UIView += "                                <span class=\"glyphicon glyphicon-toolbar-measure\"><\/span>&nbsp; 工具";
UIView += "                                <b class=\"caret\"><\/b>";
UIView += "                            <\/a>";
UIView += "                            <ul class=\"dropdown-menu\">";
UIView += "                                <li>";
UIView += "                                    <a href=\"#\" class=\"toolbar distance\" id=\"distanceBtn\">";
UIView += "                                        <span class=\"glyphicon glyphicon-toolbar-distance\"><\/span>&nbsp; 距离测量";
UIView += "                                    <\/a>";
UIView += "                                <\/li>";
UIView += "                                <li>";
UIView += "                                    <a href=\"#\" class=\"toolbar area\" id=\"areaBtn\">";
UIView += "                                        <span class=\"glyphicon glyphicon-toolbar-area\"><\/span>&nbsp; 面积测量";
UIView += "                                    <\/a>";
UIView += "                                <\/li>";
UIView += "                            <\/ul>";
UIView += "                        <\/li>";
UIView += "                    <\/ul>";
UIView += "                <\/div>";
UIView += "                <!-- \/.navbar-collapse -->";
UIView += "            <\/div>";
UIView += "            <!-- \/.container-fluid -->";
UIView += "        <\/nav>";
UIView += "    <\/div>";
UIView += "<!-- 工具栏 end -->";
document.write(UIView);