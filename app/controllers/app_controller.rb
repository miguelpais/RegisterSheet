class AppController < ApplicationController
  def dashboard
    @transactions = Transaction.find(:all);
  end
  
  def create
    if request.post?
      ref = params[:entry_ref]
      desc = params[:entry_desc]
      value = params[:entry_value]
      a = Transaction.new(:ref => ref, :desc => desc, :value => value)
      if a.save
        response = "<tr class=\"record\">
  				<td><img src=\"\/images\/edit.png\" class=\"edit\" \/><\/td>
  				<td>#{a.ref}</td>
  				<td>#{a.desc}</td>
  				<td align=\"right\">#{a.value}\u20AC<\/td><\/tr>
  				<tr>
    				<td><img src=\"\/images\/save.png\" class=\"save\" /></td>
    				<td><\/td>
    				<td><\/td>
    				<td><\/td>
    			</tr>"
        render :text => response, :layout => false
      else
        render :text => ""
      end
    end
  end
end
