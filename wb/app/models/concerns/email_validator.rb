class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ %r{
      ^(?=[a-z0-9@.!#$%&'*+/=?^_'{|}~-]{6,254})
      (?=[a-z0-9@.!#$%&'*+/=?^_'{|}~-]{1,64}@)
      [a-z0-9@.!#$%&'*+/=?^_'{|}~-]+
      (?:\.[a-z0-9@.!#$%&'*+/=?^_'{|}~-]+)*@
      (?:(?=[a-z0-9-]{1,63}\.)[a-z0-9]
      (?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63})
      [a-z0-9](?:[a-z0-9-]*[a-z0-9])?$}x
      record.errors.add attribute, (options[:message] || 'is not a valid email address')
    end
  end
end
