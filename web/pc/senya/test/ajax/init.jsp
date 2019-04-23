<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="com.autohome.topic.service.IUserService" %>
<%@ page import="com.autohome.topic.model.User" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="com.autohome.topic.utils.extend.StringHelper" %>

<%!
    private void output(HttpServletRequest request, HttpServletResponse response, String content) {
        try {
            PrintWriter printWriter = response.getWriter();
            String callBack = request.getParameter("callback");
            if (StringHelper.isNullOrEmpty(callBack)) {
                printWriter.write(content);
            } else {
                printWriter.write(callBack + "(" + content + ");");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
%>
<%
    int topicId=102927;
    String name=request.getParameter("name");
    String mobile=request.getParameter("mobile");
    if (StringHelper.isNullOrEmpty(name) || StringHelper.isNullOrEmpty(mobile)) {
        output(request, response, "{ \"status\": 0, \"userId\": 0, \"name\": \"\", \"msg\": \"姓名或手机号不能为空\" }");
        return;
    }
    WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
    IUserService userService = (IUserService)wac.getBean(IUserService.class);
    User user = userService.selectByTopicIdAndMobile(topicId, mobile);
    if (user == null) {
        output(request, response, "{ \"status\": 0,\"msg\": \"验证资料信息需与预约试驾表单信息保持一致\" }");
    } else if (!name.equals(user.getName())) {
        output(request, response, "{ \"status\": 0,\"msg\": \"验证资料信息需与预约试驾表单信息保持一致\" }");
    } else {
        user.setExtend2(1);
        userService.updateByQuery(user, null);
        output(request, response, "{ \"status\": 1, \"msg\": \"参与成功！\" }");
    }

%>