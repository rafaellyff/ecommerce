module DeviseHelper
  def devise_error_messages!
    return '' if resource.errors.empty?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t('errors.messages.not_saved',
      count: resource.errors.count,
      resource: resource.class.model_name.human.downcase)

    html = <<-HTML
    
      <p class="text-danger font-hero font-bold" >#{sentence}</p>
      <ul class="text-danger form-sizefont text-left">#{messages}</ul>
    
    HTML

    html.html_safe
  end
end