class AppController < ApplicationController
  def dashboard
    @transactions_in = Transaction.find(:all, :conditions => ["value > 0"])
    @transactions_out = Transaction.find(:all, :conditions => ["value < 0"])
    @balance = Transaction.get_balance
  end
  
  def balance
    if request.post?
      render :text => Transaction.get_balance
    end
  end
  
  def create
    if request.post?
      ref = params[:entry_ref]
      desc = params[:entry_desc]
      value = params[:entry_value].to_i
      direction = params[:direction]
      if (value <= 0 || (direction != "in" && direction != "out"))
        #abort
        render :text => ""
      end
      
      if (direction == "out")
        value = -value
      end
      
      a = Transaction.new(:ref => ref, :desc => desc, :value => value)
      if a.save
        response = "<tr class=\"record\">
  				<td><img src=\"\/images\/edit.png\" class=\"edit\" \/><\/td>
  				<td>#{a.ref}</td>
  				<td>#{a.desc}</td>
  				<td align=\"right\">#{a.value.abs}\u20AC<\/td><\/tr>
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
