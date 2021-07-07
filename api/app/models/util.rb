class Util
  def self.candle_chart(id, from, to, column)
    # TODO: Get time from request or configuration (1 * 60)
    sql = "select
          strftime('%Y-%m-%dT%H:%M:%fZ', min(created_at)) date,
          min(inventory) low,
          max(inventory) high,
          open,
          close
      from
          (SELECT *,
              FIRST_VALUE ( inventory ) OVER (
                      PARTITION BY strftime('%s', created_at) / (1 * 60)
                      ORDER BY created_at desc
                      RANGE BETWEEN UNBOUNDED PRECEDING AND
                      UNBOUNDED FOLLOWING
                  ) AS open,
              LAST_VALUE ( inventory ) OVER (
                      PARTITION BY strftime('%s', created_at) / (1 * 60)
                      ORDER BY created_at desc
                      RANGE BETWEEN UNBOUNDED PRECEDING AND
                      UNBOUNDED FOLLOWING
                  ) AS close
              from inventories_history ih_sub where " + column + " = " + id +"
              and created_at BETWEEN '"+ from.strftime("%Y-%m-%d %H:%M:%S") +"' and '"+ to.strftime("%Y-%m-%d %H:%M:%S") +"') as ih
      GROUP BY strftime('%s', created_at) / (1 * 60), open, close;"
    return ActiveRecord::Base.connection.execute(sql)
  end
end