class AppController < ApplicationController
  require 'date'
  
  def dashboard

    @date = nil
    if params[:id].nil? 
      @date = Date.today
     else
       @date = Date.parse(params[:id])
    end
    
    @transactions_in = Transaction.find(:all, :conditions => ["value > 0 AND date = ?", @date])
    @transactions_out = Transaction.find(:all, :conditions => ["value < 0 AND date = ?", @date])
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
      year = params[:entry_year].to_i
      month = params[:entry_month].to_i + 1
      day = params[:entry_day].to_i + 1
      date = Date.civil(year,month, day)
      
      direction = params[:direction]
      if (value <= 0 || (direction != "in" && direction != "out"))
        #abort
        render :text => ""
      end
      
      if (direction == "out")
        value = -value
      end
      
      a = Transaction.new(:ref => ref, :desc => desc, :value => value, :date => date)
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
